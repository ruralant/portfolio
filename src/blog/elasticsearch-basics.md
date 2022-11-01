---
title: Elasticsearch / Opensearch - Basics
slug: elasticsearch-opensearch-basics
subtitle: An introduction to Elasticsearch
category: database
tags: [elasticsearch, opensearch]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageWebP: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive,f_webp/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageAlt: An image of pure water with wite sand
mainImageThumb: https://res.cloudinary.com/antonio-rossi/image/upload/w_300,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
published: false
date: 2022-05-10
layout: development
type: development
---

Open soarch anail

text search or query and analise data (logs, or system metrix and create charts, APM application performance maangemtn)

distrinuted scales well

base on Apache Lucene (useful for sharding)

Elastic Stack:

Kibana: analisation data elasticseach dashboard

### Node

A node is an instance of Elastic. As many nodes as we want. We can have terabites of data spread on differeent nodes
Any number of nodes in a single machine But in prod used a nose for eacy VM

Each node belongs to a cluster

When a node start up, will join a cluster if it's specified, otherwise it will creATE HIS OWN CLUSTER

### Cluster

cluster collection of related node where our data is stored
cluster are indipended from each other. they usually server different purposes and multy cluster search is rare and not reccomanded

### Document

a socument is a piece of data, JOSN object
when you index a document, the original JSON is sotre with come added metadata

### Indexes

every docuiment is stored and organised in an index
an index groups documents logically and they add configuration optioons for scalability and avaiulability reasons

Indexed are a collectio of objects with simila charateristics and that are logically related
an index can store as meny object as you want, there is no hard limit.
search queries are run against indexes

## Cluster

Exposes a REST api

### Cluster health

GET `/_cluster/health`

(add an example of response)

\_cluster API
helath request

clutser name
status green
number of nodes

#### CAT api (compact)

GET /\_cat/nodes?v

v query param: show IP, load ans cpu

GET /\_cat/indices?v&expand_wildcards=all to see hidden system indexes

## Sharding

1t 2x 500gb nodes = sharding

Sharding a way to devide an ndex in different pices
sharding is done at an index lavel

useful to scale horizontally scale data volume

a shard needs to live in a node. so in the previos example we need at least 2 shards. we can use multiple chards if we need.

A shard is a Apache Lucene index

2B documents max for a shard

Sharding can also increase preformace as it allows parallelisation of quesries, increasing the throughput o an index. Thi happen because and index divided in shards can be spread in diffrent nodes, in different "hardwares" and we don't need to rely to a single VM

when we create an index we can set how may shards we want. The default was 5 (lasticsearch older than 7.0.0) but now is 1 to avoid over-sharding.

To increase the number of shard we can use a SPLIT API

To decrease the number of shards, there is a SHRINK API

## Replications

What happen is a node HDD fails? Data is lost. Solution?

Elasticsearch support replication of shard by default and with zero configuration

So, how does ti works?

Replication is configured a thr inde level. If works creating copies of the shards. all togherer as a "replication group". 1 replication is the default, but we can change it

(image of the replication)

Of course, you need to store the data on different nodes!

Usually 1 or 2 replicas is fine. but it depends if the data is also stored is another source (Dynamo?). Can you also afford downtime in this case to move the data back into Elasticsearch?

Snapshots can restore the ata to a certain point in time. they can be used as backup and we can also use them before doing big data manipolations

Replicas are a fully functional index. This means that they can be queried so they allows parallisation and improve perdomance if multiple shards are store in the same node. Replica shards can also be used for this.

So with a mltiple code CPU, we can leverage the multiple threds. Single CPU would not see any performance improvements.

Replication serve two porposes: increate availability and throughput

## Index

PUT /items creates an index

GET /\_cluster/health

IF we create a new node, the cluster health would be "yellow" because the status of the new node is "yellow". It isn't green because the index contains a replica shard that is not allocated yet because a replica shard is placed on a different node then the original index. But wqe have only a single node. So te replica shard will be pending. Te index is fully finctional but there is a risk of loosing data.

GET /\_cat/shards?v the replica shard will have a status of UNASSIGNED and the original state is STARTED (so fully functional).

### Nodes

node.master: Master node: is responsible for creating and deleting indices. It will elected by other nodes. but in large clusters, we might want to have a dedicate dmaster node.

node.data: role that enable the node to store data and serving queries. if it's a dedicated master node, this can be disabled

node.ingest: allow ingest pipelines, a series of steps thet are performed before a document is indexed

node.ml: identify the node as a machine learning
xpack.ml.enable:

## INDEXES

DELETE /test

PUT /products
{
"settings": {
"number_of_shards": 2.
"number_of_replicas": 2
}
}

REsponse {
"acknowleded": true,
"shareds_acknowleded": true,
"index": "products"
}

## Documents

POST /products/\_doc
{
"name": "coffe",
"price": 64,
"in_stock": true
}

Response: {
"\_index: "products",
"\_type": "\_doc
"\_id": "dsfsfsasfwd"
"\_version: 1,
"result": "created",
"\_shards": {
"total": 3,
"successful": 3,
"failed": 0
},
"\_seq_no": 0,
"\_primary_term": 1
}

Document was stored in three shards, and we have 2 primary shards and 2 replica shards. I was added on a primary shard and in 2 replica shards.

We can also specify the id:

POST /products/\_doc/5
{
"name": "coffe",
"price": 64,
"in_stock": true
}

Response: {
"\_index: "products",
"\_type": "\_doc
"\_id": "5"
"\_version: 1,
"result": "created",
"\_shards": {
"total": 3,
"successful": 3,
"failed": 0
},
"\_seq_no": 0,
"\_primary_term": 1
}

index are usually created automatically as there is a flag in the node called action.auto_create_index. it can be switched to false if needed

## Retrieve a document

GET /product/\_doc/5

Response: {
"\_index: "products",
"\_type": "\_doc
"\_id": "5"
"\_version: 1,
"\_seq_no": 0,
"\_primary_term": 1
"found": true,
"\_source": {
"name": "coffe",
"price": 64,
"in_stock": true
}
}

## update a document
