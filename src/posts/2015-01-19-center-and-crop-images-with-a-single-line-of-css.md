---
author: ChrisNager
comments: false
date: 2015-01-19 23:00:00+00:00
layout: post
slug: center-and-crop-images-with-a-single-line-of-css
title: Center and crop images with a single line of CSS
categories:
- CSS
---

## Using object-fit: cover

![Image of bear that has been cropped on the sides](/img/bear.jpg)

It’s simple. Set your image crop dimensions and use this line in your CSS:

```css
img {
    object-fit: cover
}
```

That’s it. No need for unsemantic, wrapping `div`s or any other nonsense.

This technique works great for cropping awkwardly-sized avatar pictures down to squares or circles. Take this wide photo of a bear below for example. Once `object-fit: cover` is applied to the image and a `width` and `height` are set, the photo crops and centers itself.

![Example of wide photo of a bear cropped with `object-fit: cover`](//i.imgur.com/zimxzQD.png)

[See it in action](//codepen.io/chrisnager/pen/azWWgr/?editors=110).

`object-fit: cover` crops the exact same way `background-size: cover` does, but is used for styling `img`s, `video`s and other media tags rather than background images.

`object-fit` has [fairly decent support in the latest browsers](//caniuse.com/#feat=object-fit) and there’s a [polyfill](//github.com/anselmh/object-fit) for older browsers (IE8+).

Interested in the other `object-fit` values? [Try them out](//codepen.io/chrisnager/pen/XJRRwo?editors=110).

_Read the original article on [Medium.com](//medium.com/@chrisnager/center-and-crop-images-with-a-single-line-of-css-ad140d5b4a87)_.
