---
title: Say hello to my new (unfinished) website
slug: new-unfinished-website
subtitle: After six years and multiple attempts, I finally managed to put a new website together
category: career
tags: [career, optimisation, svelte]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648572228/articles/first-article/home-page_fivkuj.png
mainImageWebP: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive,f_webp/v1648572228/articles/first-article/home-page_fivkuj.png
mainImageAlt: A screenshot of the home page of the new website
mainImageThumb: https://res.cloudinary.com/antonio-rossi/image/upload/w_300,fl_progressive/v1648572228/articles/first-article/home-page_fivkuj.png
published: true
date: 2022-03-28
icon: front
layout: development
type: development
---

Hello fellow cyber-wanderer, welcome to my humble (and recently renovated) cyber-home.

Jokes aside, I actually release a new version of my website as the previous one was build in a couple of night in 2016 when I was looking for a new job in software engineering.

I wanted (and attempted) to updated my website for a really long time. In the last 6 years, I started to build a new version of the website three times. I created and never published version in Angular 4, one in Gatsby and one in Next JS. After working on each the project for a few weeks, I always felt I was using a not-that-cool or not suitable technology. Which, looking back, it was a ridiculous thing to do.

Anyway, This year I completely changed my way to approach the problem. I started listing the main reasons why I wanted a new website, trying to make the list as concise as possible.

I ended up with the following improvement compared with the old website:

- more energy efficient (yes, it's a thing and I'm kind of obsesses with it)
- faster and more optimised
- it had to feature a blog

I also made a promise to myself: as soon as I achieved the aforementioned basic features, I would publish the website, even if there wasn't feature-parity with the previous one.

So today is the day! I finally published my (unfinished) new personal website and I'm quite please with it! It's still missing a lot of information compare with the previous one. Notably:

- career page
- about page
- portfolio of projects

They are all sections and pages that I'm going to add in the next few week. Before wrapping up this first blog post (exciting!), let me brag about a couple of things that are under the hood:

### Energy Efficiency

<picture class="rounded-lg drop-shadow-md">
  <source type="image/webp" srcset="https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive,f_webp/v1648399548/articles/first-article/new-website-carbon-score.png" />
  <source type="image/jpeg" srcset="https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648399548/articles/first-article/new-website-carbon-score.png" />
  <img
      src="https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648399548/articles/first-article/new-website-carbon-score.png"
      alt="carbon score"
      width={1000}
      height={1000}
      loading="lazy"
      placeholder="blur"
      class="rounded-lg drop-shadow-md"
    />
</picture>

The website is rated as more efficient than the 96% of the world wide web. I achieve it with a combination of assets optimisation, server side rendering and an extremely small amount of JavaScript shipped to the client. Svelte (the framework that I used) really helped me with that.

### Fast and optimised

The website has a perfect Lighthouse score. In simple terms, it loads fast also in old devices or with a slow connection and it's accessible by people with disabilities.

<picture class="rounded-lg drop-shadow-md">
  <source type="image/webp" srcset="https://res.cloudinary.com/antonio-rossi/image/upload/w_762,fl_progressive,f_webp/v1648400557/articles/first-article/lighthouse-score.png" />
  <source type="image/jpeg" srcset="https://res.cloudinary.com/antonio-rossi/image/upload/w_762,fl_progressive/v1648400557/articles/first-article/lighthouse-score.png" />
  <img
    src="https://res.cloudinary.com/antonio-rossi/image/upload/w_762,fl_progressive/v1648400557/articles/first-article/lighthouse-score.png"
    alt="google chrome lighthouse score"
    width={762}
    height={753}
    placeholder="blur"
    loading="lazy"
    />
</picture>

### It feature a blog

The only feature that I added and that wasn't present in the old website is the blog section. This allows me to stop procrastinating and finding excuses to not finding the time to write articles or blog posts
.
I'm using Markdown to write the articles. Nothing super fancy (so far) but I already had to overcome some MDSVEX (Markdown for Svelte) issues and I'll write an article bout that.

### It's (proudly) incomplete

As mentioned before, it's missing the career page, the list of my skills and about page. I'll build them in the next few weeks.

You can find the code that runs the website on <a href="https://github.com/ruralant/personal-website" target="_blank">Github</a>

If you have any comments, you see any issue of or you have suggestions, please do not hesitate to contact me via email, LinkedIn or Github. Fire away, I'll treasure and appreciate any feedback!
