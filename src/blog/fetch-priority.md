---
title: Fetch priority and Largest Contentful Paint (LCP)
slug: fetch-priority
subtitle: How to use the fetch priority API to improve LCP and the user experience
category: frontend
tags: [fetch, lcp, fcp, tbt, cls, performance]
published: true
date: 2023-12-27
layout: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/priority.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/priority.jpg?w=1000&h=600&format=webp&srcset';
	import PriorityHigh from '$lib/assets/images/blog/priority-high.png?w=1000&h=600';
	import PriorityHighWebP from '$lib/assets/images/blog/priority-high.png?w=1000&h=600&format=webp&srcset';
	import PriorityLowHigh from '$lib/assets/images/blog/priority-low-high.png?w=1000&h=600';
	import PriorityLowHighWebP from '$lib/assets/images/blog/priority-low-high.png?w=1000&h=600&format=webp&srcset';
	import PriorityHighHigh from '$lib/assets/images/blog/priority-high-high.png?w=1000&h=600';
	import PriorityHighHighWebP from '$lib/assets/images/blog/priority-high-high.png?w=1000&h=600&format=webp&srcset';
</script>

<Image
	wepImage={mainImageWebP}
	jpegImage={mainImage}
	alt='the start line of a running track'
	width={1000}
	height={600}
	placeholder='blur'
	classes='mt-6 mb-8 rounded-lg drop-shadow-md'
	loading='eager'
	feedImage=true
/>

Today I want to dive into Fetch Priority and Largest Contentful Paint (LCP). LCP is a Core Web Vitals metric that measures the time it takes for the largest content element to become visible within the viewport. It is a good indicator of when the main content of the page is loaded and is used to measure the perceived loading speed of a page.

### How can I find the LCP element in a page?

LCP can be an H1 tag, an image, a video, or any other element that is visible within the viewport. The LCP element is not always the same, and it can change depending on the page content and the viewport size.

To find the LCP element, we can use the DevTools. We can open the Performance tab and record a page load. Once the page load is complete, we can click on the LCP event and see the LCP element highlighted in the page.

### The LCP element is an image. What can I do?

The most expensive and tricky LCP element is an image. Images are usually the largest elements on a page, and they can take a long time to load.

The browser need to do the following:

- Find the image details in the HTML
- Download the image
- Render and display the image

Because images are expensive to display, the browser waits until it really needs to display the image before it does the aforementioned steps.

If you go to the browser network tab and you reload the page, you will probably see that the first image is set to **_high_** priority.

<Image
wepImage={PriorityHighWebP}
jpegImage={PriorityHigh}
alt='devtool showing priority changing from low to high'
width={1000}
height={600}
placeholder='blur'
classes='mt-6 mb-8 rounded-lg drop-shadow-md'
loading='lazy'
/>

However, it you toggle to the **_Slow 3G_** network in the Throttling dropdown, you will see that, at first, the image is set in **_low_** priority. And after a few milliseconds, the priority is changed to **_high_** as the browser realizes that the image is in the viewport (if you can't see this because it happens too fast, you can tick the **_Big request row_** checkbox).

<Image
wepImage={PriorityLowHighWebP}
jpegImage={PriorityLowHigh}
alt='devtool showing priority changing from low to high'
width={1000}
height={600}
placeholder='blur'
classes='mt-6 mb-8 rounded-lg drop-shadow-md'
loading='lazy'
/>

### How can I decide the priority of an element?

If not specified, the browser will decide the priority of an element based on the element type and the network conditions. However, we can also decide the priority of an element by using the `priority` attribute.

Usually, developing a site, we can have a good understanding of which is the LCP element and we can say to the browser to trust us and to set the priority to the element that we desire.

We can do it using the `fetchpriority` attribute in the following way:

```html
<img src="image.jpg" fetchpriority="high" />

<link rel="preload" href="image.png" as="image" fetchpriority="high" />

<script src="script.js" async fetchpriority="high"></script>
```

and the result would be the following:

<Image
wepImage={PriorityHighHighWebP}
jpegImage={PriorityHighHigh}
alt='devtool showing priority not changing from high'
width={1000}
height={600}
placeholder='blur'
classes='mt-6 mb-8 rounded-lg drop-shadow-md'
loading='lazy'
/>

If you decide to add the `fetchpriority` attribute to an element, make sure you do not have the `loading` attribute set to `lazy`. You don't want it anyway if the image is the LCP element.

### What is the different between `fetchpriority` and `loading`?

The two attributes do similar but different things.

The `loading` attribute (that could be set to `lazy` o `eager`) is about **WHEN** to fetch the resource. It tells the browser to **not** load the element at all, until it's visible on the screen (actually, almost visible). It's a great way to make the most of the user's bandwidth and not to waste it loading elements that the user do not see on the screen.

The `fetchpriority` attribute (that could be set to `high`, `low` or `auto`) is about **HOW** to fetch the resource. It tells the browser how important is the resource when it starts to fetch it. This means that do not stop the browser to load the element during the busy period that is the first few milliseconds of the loading page.

So, you won't have `loading="lazy"` and `fetchpriority="high"` together.

My rule of thumb is:

- If the element is the LCP element, use `fetchpriority="high"`
- If the element is not the LCP element, use `loading="lazy"`

### There is every a case where I should use `fetchpriority="low"`?

One example of when you would want to use `fetchpriority="low"` is when you have carousel of images. In this case, you want to load the first image as soon as possible, but you might not care when the other images are loaded. In this case, you can set the `fetchpriority` to `low` for the images that are not visible in the viewport.

```html
<li><img src="image1.jpg" fetchpriority="high" /></li>
<li><img src="image2.jpg" fetchpriority="low" /></li>
<li><img src="image3.jpg" fetchpriority="low" /></li>
<li><img src="image4.jpg" fetchpriority="low" /></li>
```

### Conclusion

Hopefully, this article helped you to understand how to use the `fetchpriority` attribute to improve the user experience. However, it's important to be aware that usually the browser does a good job at deciding the priority of an element, so you should use the `fetchpriority` attribute only when you're not 100% happy with the browser's decision.

I usually use it if I have multiple images on the screen, one way larger than the others, and I want to make sure that the browser loads the large image first.

I also usually use it with images. I mentioned before that it can also be used with `script` and `link` elements, but you really need to have a specific use case to use it with those elements.

Until the next time, keep on coding!
