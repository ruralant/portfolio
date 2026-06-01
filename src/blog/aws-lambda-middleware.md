---
title: How to add a middleware to an AWS Lambda
slug: aws-lambda-middleware
subtitle: The easiest and most effective way to add a middleware to an AWS lambda using Middy
category: dev ops
tags: [aws, lambda]
published: true
date: 2023-01-12
layout: development
---

<script>
  import mainImage from '$lib/assets/images/blog/leaves-middle.jpg?enhanced';
  import Image from '$lib/components/Image.svelte';
</script>

<Image
  src={mainImage}
  alt="green leaves surrounded by yellow ones"
  fetchpriority="high"
  feedImage={true}
  sizes="(min-width: 800px) 720px, 100vw"
/>

Recently I had the necessity to store the request payloads hitting our lambdas in a S3 bucket (do not ask me why :D).

After a quick investigations, I decided that the best solution was achieve this on a middleware and I started to research was was the best approach to add a middleware to a lambda function.
I worked with middlewares on Node for years, but it was the first time I had to do it on a lambda function.

The best tool I found is [Middy](https://github.com/middyjs/middy), a pretty powerful but extremely user friendly package.

The implementation is quite straightforward:

Without Middy, a Lambda function could look like the following:

```js
export const handler (event, context) => {
	// BOILERPLATE
	// E.g. decrypt environment variables with KMS
	// deserialize the content of the event
	// validate input, authentication, authorization

	// REAL BUSINESS LOGIC
	let response = doSomethingUsefulWith(event)

	// MORE BOILERPLATE
	// E.g.
	// validate output
	// serialize response
	// handle errors
	return response
}
```

However, `Middy` allow us to drastically simplify our code:

```js
import middy from "@middy/core";

const lambdaHandler = (event, context) => {
  // REAL BUSINESS LOGIC
  return doSomethingUsefulWith(event);
};

export const handler = middy(lambdaHandler)
  .use(/* Your own behaviour in a reusable fashion */)
  .use(/* logging and tracing */)
  .use(/* input validation */)
  .use(/* authentication */)
  .use(/* error handling */)
  .use(/* other behaviour */);
```

The pseudo code of the solution I came up with, it's the following:

```typescript
// s3_utils.ts

Export default saveOnS3 (payload: string): void => {
	// save to S3
}
```

```typescript
// Function.ts

import middy from '@middy/core'
import saveOnS3 from '../s3_utils'

const buildHandlerWithDefaultMiddleware(
	baseHandler: (event: APIGatewayProxyEvent, context: MiddlewareContext) => Promise<APIGatewayProxyResult>,
) {
	return middy(baseHandler)
	.use(saveOnS3(event.body))
	.use(furtherLogic())
	.user(evenFurtherLogic())

```

It's a quite straightforward implementation. However, if you have any question or feedback, please reach out.

Until the next time, keep on coding!
