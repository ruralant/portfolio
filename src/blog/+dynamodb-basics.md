---
title: DynamoDB - Basics
slug: dynamodb-basics
subtitle: An introduction to classes in DynamoDB
category: database
tags: [dynamodb, aws]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageWebP: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive,f_webp/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageAlt: An image of pure water with wite sand
mainImageThumb: https://res.cloudinary.com/antonio-rossi/image/upload/w_300,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
published: false
date: 2022-05-10
layout: development
---

Relational database are ineficient when we need to process largely unstructure data with hugn volume and high frequency. This is where NoSQL dataase can help.
DynamoDB is a NosQL datansde (like mMongoDB).

It serverless, clodu, nosql, fast, flexible, cost effective, fault tollerant and secure.

#### Serverless and Cloud

fully managed and you pay for what you use and part of AWS

#### NoSQL

Allow to work with dig data (high vilume, high variety,largely unstructure of semi structure ) and it has high concurrent operations

#### Fast

Latency under 10ms (DAX can reduce it to microsecond using chaceing strategies)

#### Flexible

unstructure data, righ data modal

#### cost effective

pay for what you use, price per capacity. follow best practices

#### Fault tollecant

different availability zones, cross reagions replications.

#### Secure

finegrane access control

### Terminology: SQL vs DynamoDB

| SQL                                     | Nosql                                                         |
| --------------------------------------- | ------------------------------------------------------------- |
| Tables                                  | Tables                                                        |
| Rows                                    | Items                                                         |
| Columns                                 | Attributes                                                    |
| Primary Keys (Multicolumn and Optional) | Primary keys - Mandatory, minumum one, maximum two attributes |
| Indexes                                 | Local secondary indexes                                       |
| Views                                   | Global secondary Indexes                                      |

### DynamoDB Naming Conventions

DD there aren't multiple dabatanse, but there are tables are the top level entities.
To better organise table, use naming convetions. Add identifiers: `test.users`, `test_users`. Different reagions can have different tables (of course)

Tables are totaly separated between each other (no forein keys) but we can impelement our on logic to enforce relationships (so there are ways to circumvent this)

### Data Types

Scalar Types: exaclty on value, string, numbers, binary, bolleans, and null.

Set Types: multiple scalar valuess: strin set, numberset and binary set,

Document types: complex structures with nested attributes (lits, map) nested JSON.
When we cretae a table or index, we need to specify the data type of each of the keys.

Keys can be only scalar string, number na binary. no boolean, sets or document types

No empty values (no empty strings). If you use strings/numebers as indexes the attrubie size needs to ne under 2kb as primary index or 1kb if used as sort key

Sets: unorders collections of strings or numbers. not mix of sata in sets (same type). No dumplicate values, No empty sets

List and Maps: can be nested in each orther 32, levels deep. yes empty.

List: is an ordered collections of one or more data types: [John, 100, Apples]
Maps: unordered collection of Key Values pairs. Ideal for JSON and no restrictions of the data types. Be mindful that if you store JSON, it won't be stored as JSON but as a superset (like MongoDB stores in BSON)

### Consistancy

dynamo store three copy of the database in three SSD in three facilities within a reagion. There are three indipendend failous domains
Near real time replications. However, it can take 1 or 2 seconds to share data so be mindful of that.

#### Stringly Consistent Reads

Returns most updated data

#### evecuallt consistent read

Returns a compy of the data from any of the three copy of the database and the data can be the most updated one but not always (remember the 1/2 seconds delay me metioned before?). However, this request is 50% cheaper than the previos one. Most of the time, this choice is fine.

### Capacity Units

Tables:
top levels entities
mandatory primary keys (PK)
control performance at the table lavel as they ar eindipendent from each other.

#### Thriughput capacity

we can provision TC for each table we create. Allows to ensure predictable capacity and can be scaled up and down. with autoscaling we can automate and make cost effcient use od dynamoDB

Capacity units are splitted between read and write capacity units RCU, WCU
Pricing is pay per use charges per unit used.
1 unit per capasity = 1 request/second

#### RCU

one RCU allows you to perform one strongly consistent read per second or 2 eventually consistent read per second. Item upt to 4kb per size. so 4KB in strongly consistent read consumes 1 RCU but 4kb of evencually consistent data consumes 0.5 RCUs.

#### WCU

one WCU allows us to prform 1 table write per second. in block of 1kb per size

Example
10KB of data per item in our database
We prvision a capacity of 10RCUs and 10WCUs

So our application can perform a strongly consisteny read of 40KB/s (4KB x 10 RCUs)
evencually consistent read od 80KB/second (2 x 4KB x 10 RCUs)
And and it can write up to 10KB/s (1KB x 10 WCU)

#### diffetent useful calculations

how many RCU we need to read 10KB of data pr second:

with string consistency: 10KB/4KB = 2.5 => I would acocunt for 3RCUs
with eventually consistency it's going to be half of that.

to write 10KB per seconds: 10KB/1KB = 10 WCUs
to write 1.5KV per second: 1.5KB/1KB = 1.5 => I would account for 2WCUs

#### BURST

if the app attempt to use more capacity, Dynamo provide a Burst caacity for occasionally spikes.
to provide this burst capacity, Dyanmo retains our unused capacity up to 5 minutes for latter use.

however, we should not rely upon it and exitind it meand that the requests will be throttled.

Remember that is possible to set scaling p and down rules up to 4 times a day.

### On-Demand Capacity

The ODC it's farly new to Dynamo. With ODC you dont tneed to specify the read and write throput and Dynamo automatically and istantly accomodate the capscity needed by your application.

It has pro and cons: It's a good choice if you're early in the development and you're not sure of the workload you will need. The most important cons to keep in mind is that the costs can have an higher flactuation.

### Partitions

Understanding partitions is crucial to understand how DyanmoDB works.
Dynamo stored data into partisions. A table can have one or more partitions depending of the provions of throughput that we set. They are managed internally by DynamoDB and the end user do not have to intercat with them. But knowing that they exist and understand them can be really useful.

Each partition can hold:
1 partition = 10GB of data
1 partition - 1000WCUs or 3000 RCUs

if the app exides on of the limits, Dyanmo will add more partitions in the background.

When we create a new table, the dimention of the partition depens on the provisined capacity:
es: 500 RCus and 500 WCUs => 500 RCUs/3000 + 500 WCUs/1000 = 0.67 => 1 partition

if you increate the trhoughput, dynamo will recalulate the number of partitions requred
es2: 1000 RCus and 1000 WCUs => 1000 RCUs/3000 + 1000 WCUs/1000 = 1.33 => 2 partition

In this example, DYnao will do the following:

- it will create two new partitions
- il will distribute the existing data between them
- it will delete the original partition

at this point, the throuput capacity will be divided between the two partitions so the new partitions will receve half d the provisioned capacity units.

### IMPORTANT

What is important to understand is that, when a new partition is created, it won't be deleted if we scale down our needs. So our throughput can be reduced compare with having a single partition and at that point, the only way to improve performance is not to improve the throput of each partition and that will increase costs (or you need to recreate the table!!!)

### Table Indexes

A table can have a simple (hash key) PK or a Composit one (PK + Sort key). When we create a table, we need to choose with of the two keys we want.

The Hash Key will define in which partitions the items will be stored. Of course, a single partition will store multiple items wirh multiple Hash Keys.

DynamoDb will use an Hashing Algorith will decide where every new item will be stored.

If the table use also a Sort Key the mechanism will be the same but the items will be sotred near eash other and they will be ordered by the Sort key

### Local Secondary Indexes and Global Indexes

| Department (PK) | Employee Id (SK) | Name  | Age | Location | Date of Join |
| --------------- | ---------------- | ----- | --- | -------- | ------------ |
| Board           | 1                | Tim   | 40  | London   | 01-01-2022   |
| R&D             | 2                | Jim   | 33  | London   | 01-02-2022   |
| Finance         | 3                | Larry | 55  | Reading  | 01-03-2022   |
| R&D             | 4                | Molly | 21  | Bristol  | 01-04-2022   |

Department = PK
Employee id = SK
All other = attributes

if we nat to query the employee with ID one, we can do that using `department = training && epmplyee id = 1` and Dynamo will return the Tim record.

if we want all the perople from `R&D` sorted by employee id we can use `department = training && sorty key = employee ID`

however, if we want all the employyes from `R&D` sorted by date of join: You will need create a new Index with the sort key set to date of join

| Department (PK/Secondary K) | Employee Id | Name  | Age | Location | Date of Join (SK) |
| --------------------------- | ----------- | ----- | --- | -------- | ----------------- |
| Board                       | 1           | Tim   | 40  | London   | 01-01-2022        |
| R&D                         | 2           | Jim   | 33  | London   | 01-02-2022        |
| Finance                     | 3           | Larry | 55  | Reading  | 01-03-2022        |
| R&D                         | 4           | Molly | 21  | Bristol  | 01-04-2022        |

This new index is called `a Local Secondat Index` as the Departmet is now Primary Key and Seondary Key. Ypu need to create this index when you create the table. You can't create Local Primary Indexes later on. Ypu cna create 5 of them.

| Department | Employee Id | Name  | Age | Location (SPK) | Date of Join (SSK) |
| ---------- | ----------- | ----- | --- | -------------- | ------------------ |
| Board      | 1           | Tim   | 40  | London         | 01-01-2022         |
| R&D        | 2           | Jim   | 33  | London         | 01-02-2022         |
| Finance    | 3           | Larry | 55  | Reading        | 01-03-2022         |
| R&D        | 4           | Molly | 21  | Bristol        | 01-04-2022         |

Let's say we want to queti all the people from R&D and Board that are based in London. Dynamo provided a Global Secondary Index, an index where the partioton key is different than the primary key. We have a seondary partition key. So location will be a SPK and Date of jon the SSK. Dynamo allws you to create 5 of them. Global secondary index can be created any tme! they are store in their own partiton. They have the own throuput capacity and they can e set separatly. ou can onyl perform eventuallt consistent reads.
