---
title: Co2.js - A library to Measure the web carbon emissions
slug: co2-js
subtitle: It's a lightweight library that can be easily added to any web application and used to track and analyse its carbon footprint
category: green software
tags: [javascript, carbon, emissions]
published: true
date: 2023-05-12
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/co2.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/co2.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/co2.jpg?w=1000&h=600&srcset';
</script>

<Image
	wepImage={mainImageWebP}
	jpegImage={mainImage}
	alt='a stormtrooper picking up a flower'
	width={1000}
	height={600}
	placeholder='blur'
	classes='mt-6 mb-8 rounded-lg drop-shadow-md'
	loading='eager'
	feedImage=true
/>

The world wide web is a major contributor to climate change. In fact, it is estimated that the internet accounts for about 2% of global carbon emissions. This is due to the energy required to power data centers, transmit data over networks, and cool servers.

CO2.js is a lightweight library that helps developers estimate the carbon emissions associated with their websites and apps.

In this blog post, we'll take a closer look at CO2.js and explore its features, use cases, and benefits. We'll also provide a code example to show how to use the library.

### Getting Started with CO2.js in the browser or Node.js

The easiest way to start to use the library in the browser is to use SkyPack. SkyPack is a CDN that allows us to import npm packages directly in the browser.

```html
<script type="module">
  import tgwf from "https://cdn.skypack.dev/@tgwf/co2";
</script>
```

Both in the browser and in Node.js, we can use NPM to install the library:

```bash
npm install @tgwf/co2
```

### Calculating Carbon Emissions per byte of data

CO2.js has a `perByte` function that accepts two arguments:

- `bytes`: The number of bytes transferred
- `green`: A boolean indicating whether the transfer was green or not

The function returns the amount of carbon emissions in grams of CO2.

Here is an example:

```javascript
import { perByte } from "@tgwf/co2";

const bytes = 1000000; // 1MB
const greenHost = true;

const estimatedEmissions = perByte(bytes, greenHost).toFixed(3);

console.log(emissions); // 0.01kgCO2e
```

For most of the use cases, this can be enough. However, we can also choose which model to use between the **_OneByte_** and the **_Sustainable Web Design_** model.

#### OneByte

The OneByte model is based on the [OneByte](https://onebyte.dev/) project. It is a simple model that uses the average carbon intensity of the internet to calculate the carbon emissions per byte of data.

```javascript
import { co2 } from "@tgwf/co2";

const oneByte = new co2({ model: "1byte" });
```

#### Sustainable Web Design

The Sustainable Web Design model is based on the [Sustainable Web Design](https://sustainablewebdesign.org/) project. It is a more complex model that takes into account the device type, network type, and CPU utilisation to calculate the carbon emissions per byte of data.

```javascript
import { co2 } from "@tgwf/co2";

const swd = new co2();

const declaredSwd = new co2({ model: "swd" });
```

Alongside the `perByte()` function, `CO2.js` provides also a `perVisit()` function. It's the best function to calculate the carbon emissions of a website, however, it's important to read and understand the model used and be comfortable with the assumptions made. We can find all the information in the following link: [Calculating Digital Emissions](https://sustainablewebdesign.org/calculating-digital-emissions/).

I also will have an article on this topic soon.

Anyway, if we want to use the `perVisit()` function, we can do it in the following way:

```javascript
import { co2 } from "@tgwf/co2";

const swd = new co2({ model: "swd" });

const emissions = swd.perVisit(1000000);
```

### Checking if a domain for green hosting

Another use case for CO2.js is to check if a domain is hosted on a green host. This can be achieved in the following way:

```javascript
const { hosting } = require("@tgwf/co2");

hosting.check("antoniorossi.net").then((result) => {
  console.log(result); // Output: true
});
```

We can also check multiple domains:

```javascript
const { hosting } = require("@tgwf/co2");

const domains = ["antoniorossi.net", "twitter.com"];

hosting.check(["antoniorossi.net", "google.com"]).then((result) => {
  console.log(result); // Output: ["antoniorossi.net"]
});
```

As we can see, the API will return only the domains that are hosted on a green host.

### Other APIs

CO2.js provides also other APIs that can be useful for developers. For example, we can use the `grid-intensity` API to get the carbon intensity of the grid in a specific country or the `ip-to-co2intensity` API to get the carbon intensity of the grid in the country where the user is located.

I'll have a dedicated article on these APIs soon.

### Conclusion

CO2.js is a powerful tool for web developers who want to build environmentally friendly web applications. The library is easy to use and integrates with various third-party tools, making it an ideal solution for sustainability reporting, carbon offsetting, and environmental optimization.

By using CO2.js, developers can reduce the carbon footprint of their web applications, improve the user experience, and increase transparency about the environmental impact of their web application.

Keep on building green software!
