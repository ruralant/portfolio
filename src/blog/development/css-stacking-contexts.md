---
title: Solving z-index wars with the stacking contexts
slug: css-stacking-contexts
subtitle: Possibly the best strategy to solve z-index madness
category: css
tags: [css, z-index, insolation, stacking contexts]
published: true
date: 2023-01-18
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/isolation.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/isolation.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/isolation.jpg?w=1000&h=600&srcset';

  import pricingUi from '$lib/assets/images/blog/pricing-ui.jpg?w=1000&h=600';
  import pricingUiWebP from '$lib/assets/images/blog/pricing-ui.jpg?w=1000&h=600&format=webp&srcset';
  import pricingUiSrcset from '$lib/assets/images/blog/pricing-ui.jpg?w=1000&h=600&srcset';
</script>

<Image
  wepImage={mainImageWebP}
  jpegImage={mainImage}
  alt='an isolated chair in the middle of a road'
  width={1000}
  height={600}
  placeholder='blur'
  classes='mt-6 mb-8 rounded-lg drop-shadow-md'
  loading='eager'
  feedImage=true
/>

In large projects, or in projects that spans across months or years, it's common to start to loose track of `z-indexes`.

What usually happen is that you start to use `z-index` that are commonsensical (1, 2, 3) but one day you start to loose track of them and you set a element to 100, just to be sure that is the very top one. However, after a few months (or someone else works on you code) and the same issue happen again, so the next `z-index` is set to 400. And then the z-index war starts.

But it doesn't need to be this way, there are strategies to avoid the conflict. But let's see a practical example of the issue before we dive into the solution:

Let's take a look at an example. In the past I built a few websites for companies and local businesses and a lot of time I had to build component with the pricing model.

Something like this one:

<Image
wepImage={pricingUiWebP}
jpegImage={pricingUi}
alt='old carbon score'
width={1000}
height={600}
placeholder='blur'
classes={'mt-6 mb-8 rounded-lg drop-shadow-md'}
/>

And let's say the website had a sticky navigation bar on the top of the screen with the company logo and the links to different pages (yes, yes, also old school, I know!)

You start to build this UI, you code the three cards if the different pricing models and you add to the central card what you believe it be the highest `z-index`.

All works fine, until you scroll to the top and the cards on the right slide underneath the navbar, but the on the top slides above the navbar (we have all been there, in a way or another).

This happen because the the entire page is one massive **stacking context** and maybe someone you added `z-index: 100` to the card and the navbar was set to the same value by someone else or months before.

What a mess, right?

Yes, but it doesn't need to be in this way. We could create a new stacking context for the pricing component that we just created and we isolate it from the rest of the page.

There are two ways to create a staking context. One way is to add `position` and `z-index` to the wrapped of the pricing ui.

```css
.pricing-wrapper {
  position: relative;
  z-index: 1;
}
```

This two properties together will create a new staking context, flattening the pricing component. Inside the `pricing-wrapper` we'll still have the a `z-index` hierarchy, but the outside world will see it as a single element (from the stacking prospective).

In this way, if the navigation bar had `z-index: 100` and our component being set to `1`, will slide underneath the navigation bar, even if our central card has `z-index: 100`.

There is also a much nicer way to create a staking context and it can be done with a single css property:

```css
.card {
  isolation: isolate;
}
```

The isolation property has a single specific purpose: creates a stacking context.

It will flatten the component as we describe before, but without the need to add a z-index on the parent. I'm not sure when the `isolation` property was added to css, however it started to became popular fairly recently. I think I started see the property popping up around 2020 and I ignored it for a while.

However, I'm found myself using it pretty often, in particular in component that I know will be reused multiple times inside an application. Setting the property allows me to have the piece of mind that the hierarchy that I set inside it, will be ignored by the rest of the codebase.

Until the next time, keep on coding!
