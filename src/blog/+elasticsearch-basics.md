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
---

Open soarch anail

text search or query and analise data (logs, or system metrix and create charts, APM application performance maangemtn)

distrinuted scales well

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
