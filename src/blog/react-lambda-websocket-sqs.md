---
title: Connecting a React App to Lambda with WebSockets and SQS using CloudFormation
slug: react-lambda-websocket-sqs
subtitle: A practical guide to building a real-time serverless backend with API Gateway WebSockets, Lambda, and SQS on AWS
category: front end
tags: [react, aws, lambda, websocket, sqs, cloudformation, serverless]
published: true
date: 2026-02-06
layout: development
---

Building real-time features in a React application usually means reaching for WebSockets. When the backend is serverless, AWS API Gateway WebSocket APIs combined with Lambda functions and SQS give you a scalable, event-driven architecture without managing any servers.

This guide walks through the full setup: a React client that opens a WebSocket connection, an API Gateway WebSocket API defined in CloudFormation, Lambda functions written in Node.js that handle connections and messages, and an SQS queue for reliable, decoupled message processing.

## Architecture overview

The architecture looks like this:

1. A **React app** opens a WebSocket connection to API Gateway.
2. **API Gateway** (WebSocket API) routes incoming frames to **Lambda functions** based on route keys (`$connect`, `$disconnect`, `sendMessage`).
3. The message-handling Lambda pushes work onto an **SQS queue** for asynchronous processing.
4. A separate **worker Lambda** is triggered by SQS and processes messages, posting results back to the client through the API Gateway Management API.
5. **DynamoDB** stores active connection IDs so that Lambdas can push messages back to the right clients.

```
React App
    │
    ▼
API Gateway (WebSocket)
    │
    ├── $connect    → connectHandler Lambda → DynamoDB (store connectionId)
    ├── $disconnect → disconnectHandler Lambda → DynamoDB (remove connectionId)
    └── sendMessage → messageHandler Lambda → SQS Queue
                                                  │
                                                  ▼
                                            workerHandler Lambda
                                                  │
                                                  ▼
                                          API Gateway Management API
                                                  │
                                                  ▼
                                            React App (receives message)
```

## CloudFormation template

The CloudFormation template defines all the AWS resources. Let's break it down section by section.

### The WebSocket API and routes

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: WebSocket API with Lambda and SQS

Parameters:
  StageName:
    Type: String
    Default: production

Resources:
  WebSocketApi:
    Type: AWS::ApiGatewayV2::Api
    Properties:
      Name: WebSocketApi
      ProtocolType: WEBSOCKET
      RouteSelectionExpression: "$request.body.action"

  ConnectRoute:
    Type: AWS::ApiGatewayV2::Route
    Properties:
      ApiId: !Ref WebSocketApi
      RouteKey: $connect
      AuthorizationType: NONE
      OperationName: ConnectRoute
      Target: !Join
        - '/'
        - - 'integrations'
          - !Ref ConnectIntegration

  DisconnectRoute:
    Type: AWS::ApiGatewayV2::Route
    Properties:
      ApiId: !Ref WebSocketApi
      RouteKey: $disconnect
      AuthorizationType: NONE
      OperationName: DisconnectRoute
      Target: !Join
        - '/'
        - - 'integrations'
          - !Ref DisconnectIntegration

  SendMessageRoute:
    Type: AWS::ApiGatewayV2::Route
    Properties:
      ApiId: !Ref WebSocketApi
      RouteKey: sendMessage
      AuthorizationType: NONE
      OperationName: SendMessageRoute
      Target: !Join
        - '/'
        - - 'integrations'
          - !Ref SendMessageIntegration
```

The `RouteSelectionExpression` tells API Gateway to look at `action` in the JSON body to decide which route to invoke. For example, sending `{"action": "sendMessage", "data": "hello"}` will hit the `SendMessageRoute`.

### Lambda integrations

Each route needs an integration that points to a Lambda function:

```yaml
  ConnectIntegration:
    Type: AWS::ApiGatewayV2::Integration
    Properties:
      ApiId: !Ref WebSocketApi
      IntegrationType: AWS_PROXY
      IntegrationUri: !Sub arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${ConnectFunction.Arn}/invocations

  DisconnectIntegration:
    Type: AWS::ApiGatewayV2::Integration
    Properties:
      ApiId: !Ref WebSocketApi
      IntegrationType: AWS_PROXY
      IntegrationUri: !Sub arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${DisconnectFunction.Arn}/invocations

  SendMessageIntegration:
    Type: AWS::ApiGatewayV2::Integration
    Properties:
      ApiId: !Ref WebSocketApi
      IntegrationType: AWS_PROXY
      IntegrationUri: !Sub arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${SendMessageFunction.Arn}/invocations
```

### Deployment and stage

```yaml
  Deployment:
    Type: AWS::ApiGatewayV2::Deployment
    DependsOn:
      - ConnectRoute
      - DisconnectRoute
      - SendMessageRoute
    Properties:
      ApiId: !Ref WebSocketApi

  Stage:
    Type: AWS::ApiGatewayV2::Stage
    Properties:
      StageName: !Ref StageName
      DeploymentId: !Ref Deployment
      ApiId: !Ref WebSocketApi
```

### DynamoDB connections table

A simple table to keep track of which clients are connected:

```yaml
  ConnectionsTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: WebSocketConnections
      AttributeDefinitions:
        - AttributeName: connectionId
          AttributeType: S
      KeySchema:
        - AttributeName: connectionId
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST
```

### SQS queue

```yaml
  MessageQueue:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: WebSocketMessageQueue
      VisibilityTimeout: 60
      MessageRetentionPeriod: 86400
      RedrivePolicy:
        deadLetterTargetArn: !GetAtt DeadLetterQueue.Arn
        maxReceiveCount: 3

  DeadLetterQueue:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: WebSocketMessageDLQ
      MessageRetentionPeriod: 1209600
```

Always include a dead-letter queue. If a message fails processing three times, it moves to the DLQ instead of blocking the main queue or being silently lost.

### Lambda functions

```yaml
  ConnectFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: ws-connect
      Runtime: nodejs20.x
      Handler: handlers/connect.handler
      CodeUri: ./src/
      Environment:
        Variables:
          CONNECTIONS_TABLE: !Ref ConnectionsTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref ConnectionsTable

  DisconnectFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: ws-disconnect
      Runtime: nodejs20.x
      Handler: handlers/disconnect.handler
      CodeUri: ./src/
      Environment:
        Variables:
          CONNECTIONS_TABLE: !Ref ConnectionsTable
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref ConnectionsTable

  SendMessageFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: ws-send-message
      Runtime: nodejs20.x
      Handler: handlers/sendMessage.handler
      CodeUri: ./src/
      Environment:
        Variables:
          QUEUE_URL: !Ref MessageQueue
          CONNECTIONS_TABLE: !Ref ConnectionsTable
      Policies:
        - SQSSendMessagePolicy:
            QueueName: !GetAtt MessageQueue.QueueName
        - DynamoDBCrudPolicy:
            TableName: !Ref ConnectionsTable

  WorkerFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: ws-worker
      Runtime: nodejs20.x
      Handler: handlers/worker.handler
      CodeUri: ./src/
      Environment:
        Variables:
          CONNECTIONS_TABLE: !Ref ConnectionsTable
          WEBSOCKET_ENDPOINT: !Sub "https://${WebSocketApi}.execute-api.${AWS::Region}.amazonaws.com/${StageName}"
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref ConnectionsTable
        - Statement:
            - Effect: Allow
              Action:
                - execute-api:ManageConnections
              Resource: !Sub "arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${WebSocketApi}/*"
      Events:
        SQSEvent:
          Type: SQS
          Properties:
            Queue: !GetAtt MessageQueue.Arn
            BatchSize: 10
```

### Lambda permissions for API Gateway

API Gateway needs permission to invoke each Lambda:

```yaml
  ConnectPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref ConnectFunction
      Principal: apigateway.amazonaws.com

  DisconnectPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref DisconnectFunction
      Principal: apigateway.amazonaws.com

  SendMessagePermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref SendMessageFunction
      Principal: apigateway.amazonaws.com
```

### Outputs

```yaml
Outputs:
  WebSocketURL:
    Description: WebSocket API URL
    Value: !Sub "wss://${WebSocketApi}.execute-api.${AWS::Region}.amazonaws.com/${StageName}"
```

## Lambda handlers in Node.js

### Connect handler

When a client connects, store their connection ID in DynamoDB.

```js
// src/handlers/connect.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const connectionId = event.requestContext.connectionId;

  try {
    await docClient.send(
      new PutCommand({
        TableName: process.env.CONNECTIONS_TABLE,
        Item: {
          connectionId,
          connectedAt: new Date().toISOString(),
        },
      })
    );

    return { statusCode: 200, body: "Connected" };
  } catch (error) {
    console.error("Connect error:", error);
    return { statusCode: 500, body: "Failed to connect" };
  }
};
```

### Disconnect handler

Remove the connection ID when the client disconnects.

```js
// src/handlers/disconnect.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const connectionId = event.requestContext.connectionId;

  try {
    await docClient.send(
      new DeleteCommand({
        TableName: process.env.CONNECTIONS_TABLE,
        Key: { connectionId },
      })
    );

    return { statusCode: 200, body: "Disconnected" };
  } catch (error) {
    console.error("Disconnect error:", error);
    return { statusCode: 500, body: "Failed to disconnect" };
  }
};
```

### Send message handler

This handler receives a message from the client and pushes it onto the SQS queue for async processing. It also sends an immediate acknowledgement back to the client.

```js
// src/handlers/sendMessage.js
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";

const sqsClient = new SQSClient({});

export const handler = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const body = JSON.parse(event.body);
  const { domainName, stage } = event.requestContext;

  try {
    // Send the message to SQS for processing
    await sqsClient.send(
      new SendMessageCommand({
        QueueUrl: process.env.QUEUE_URL,
        MessageBody: JSON.stringify({
          connectionId,
          data: body.data,
          timestamp: new Date().toISOString(),
        }),
      })
    );

    // Acknowledge receipt to the client
    const apiClient = new ApiGatewayManagementApiClient({
      endpoint: `https://${domainName}/${stage}`,
    });

    await apiClient.send(
      new PostToConnectionCommand({
        ConnectionId: connectionId,
        Data: JSON.stringify({
          type: "ack",
          message: "Message received and queued for processing",
        }),
      })
    );

    return { statusCode: 200, body: "Message sent" };
  } catch (error) {
    console.error("SendMessage error:", error);
    return { statusCode: 500, body: "Failed to send message" };
  }
};
```

### Worker handler (SQS consumer)

This Lambda is triggered by SQS. It processes the message and sends the result back to the connected client through the API Gateway Management API.

```js
// src/handlers/worker.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
  GoneException,
} from "@aws-sdk/client-apigatewaymanagementapi";

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);

const apiClient = new ApiGatewayManagementApiClient({
  endpoint: process.env.WEBSOCKET_ENDPOINT,
});

async function processMessage(data) {
  // Replace this with your actual business logic
  return {
    type: "result",
    processed: true,
    originalData: data,
    processedAt: new Date().toISOString(),
  };
}

export const handler = async (event) => {
  const failedMessageIds = [];

  for (const record of event.Records) {
    const { connectionId, data } = JSON.parse(record.body);

    try {
      // Check if the connection is still active
      const connection = await docClient.send(
        new GetCommand({
          TableName: process.env.CONNECTIONS_TABLE,
          Key: { connectionId },
        })
      );

      if (!connection.Item) {
        console.log(`Connection ${connectionId} no longer exists, skipping`);
        continue;
      }

      // Process the message
      const result = await processMessage(data);

      // Send the result back to the client
      await apiClient.send(
        new PostToConnectionCommand({
          ConnectionId: connectionId,
          Data: JSON.stringify(result),
        })
      );
    } catch (error) {
      if (error instanceof GoneException) {
        console.log(`Connection ${connectionId} is gone, skipping`);
        continue;
      }

      console.error(`Failed to process message ${record.messageId}:`, error);
      failedMessageIds.push(record.messageId);
    }
  }

  // Report partial batch failures so only failed messages are retried
  if (failedMessageIds.length > 0) {
    return {
      batchItemFailures: failedMessageIds.map((id) => ({
        itemIdentifier: id,
      })),
    };
  }

  return { statusCode: 200 };
};
```

A few important details in the worker:

- **Partial batch failure reporting**: instead of failing the entire batch when one message has an issue, we return `batchItemFailures` so only the problematic messages are retried. To use this, enable `ReportBatchItemFailures` in the event source mapping (add `FunctionResponseTypes: [ReportBatchItemFailures]` to the SQS event in the CloudFormation template).
- **GoneException handling**: if the client disconnected before the worker finished, the API Gateway Management API throws a `GoneException`. We catch it and skip instead of retrying.

## React client

On the frontend, we need a WebSocket hook that manages the connection lifecycle and handles incoming messages.

### WebSocket hook

```jsx
// src/hooks/useWebSocket.js
import { useEffect, useRef, useState, useCallback } from "react";

const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;
const RECONNECT_DELAY = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const socketRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const reconnectTimer = useRef(null);

  const connect = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
    };

    socket.onclose = () => {
      setIsConnected(false);

      if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
        reconnectTimer.current = setTimeout(() => {
          reconnectAttempts.current += 1;
          connect();
        }, RECONNECT_DELAY);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastMessage(data);
    };

    socketRef.current = socket;
  }, []);

  const sendMessage = useCallback((data) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          action: "sendMessage",
          data,
        })
      );
    }
  }, []);

  const disconnect = useCallback(() => {
    clearTimeout(reconnectTimer.current);
    reconnectAttempts.current = MAX_RECONNECT_ATTEMPTS;
    socketRef.current?.close();
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { isConnected, lastMessage, sendMessage, disconnect };
}
```

The `action: "sendMessage"` in the JSON body matches the `RouteSelectionExpression` we defined in the CloudFormation template. API Gateway reads the `action` field and routes the frame to the correct Lambda.

### Using the hook in a component

```jsx
// src/components/Chat.jsx
import { useState, useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

export function Chat() {
  const { isConnected, lastMessage, sendMessage } = useWebSocket();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (lastMessage) {
      setMessages((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ text: input });
    setMessages((prev) => [...prev, { type: "sent", text: input }]);
    setInput("");
  };

  return (
    <div>
      <div>
        <span>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>

      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.type === "sent" ? "You" : "Server"}: {msg.text || msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        <button type="submit" disabled={!isConnected}>
          Send
        </button>
      </form>
    </div>
  );
}
```

## Deploying the stack

If you are using the SAM CLI (which supports CloudFormation with the `AWS::Serverless` transform):

```bash
sam build
sam deploy --guided
```

The `--guided` flag walks through configuration the first time: stack name, region, and whether to allow IAM role creation. Subsequent deploys can use `sam deploy` directly.

After deployment, grab the WebSocket URL from the stack outputs and set it as `REACT_APP_WEBSOCKET_URL` in your React app's environment.

## Why SQS in the middle?

You might wonder why we don't just process messages directly in the `sendMessage` Lambda. There are a few reasons to put SQS in between:

- **Decoupling**: the WebSocket handler responds instantly while heavy processing happens asynchronously. This keeps the WebSocket connection responsive.
- **Reliability**: if the processing Lambda fails, the message stays in the queue and gets retried automatically. Without SQS, a failed invocation means a lost message.
- **Rate control**: SQS acts as a buffer. If a spike of messages comes in, the worker Lambda scales at a controlled pace based on the `BatchSize` and concurrency settings, rather than spinning up hundreds of invocations simultaneously.
- **Dead-letter queue**: messages that repeatedly fail are captured in the DLQ for debugging instead of disappearing.

## Common pitfalls

**Stale connections**: clients can disconnect without sending a proper close frame (e.g. closing a laptop lid). The `$disconnect` route fires eventually, but there can be a delay. Your worker should handle `GoneException` gracefully.

**Cold starts**: Lambda cold starts can add latency to WebSocket responses. If response time is critical, consider using provisioned concurrency on the worker function.

**Message ordering**: SQS standard queues do not guarantee ordering. If message order matters, use a FIFO queue instead and set a `MessageGroupId`.

**10-second integration timeout**: API Gateway WebSocket integrations have a 29-second timeout, but the initial `$connect` route has a 10-second limit. Keep the connect handler lightweight.

**Payload size**: API Gateway WebSocket frames are limited to 128 KB for sending and 32 KB for receiving. For larger payloads, upload to S3 and send a reference through the WebSocket.

## Summary

This architecture gives you a serverless, real-time communication layer between a React frontend and a Node.js backend. CloudFormation makes it reproducible across environments. The key pieces are:

1. **API Gateway WebSocket API** for persistent connections with route-based dispatching.
2. **Lambda functions** for connection management and message handling.
3. **SQS** for reliable, decoupled async processing.
4. **DynamoDB** for tracking active connections.
5. **A React hook** that manages the WebSocket lifecycle with automatic reconnection.

The combination scales from zero to thousands of concurrent connections without managing any servers, and the SQS buffer protects your processing layer from traffic spikes.
