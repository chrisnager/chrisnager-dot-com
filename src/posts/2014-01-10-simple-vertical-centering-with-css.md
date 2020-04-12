---
author: ChrisNager
comments: false
date: 2014-01-10 19:00:03+00:00
layout: post
slug: simple-vertical-centering-with-css
title: Simple vertical centering with CSS
wordpress_id: 614
categories:
- CSS
---

<p data-height="288" data-theme-id="51" data-slug-hash="xFaJl" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/chrisnager/pen/xFaJl'>Simple vertical centering with CSS</a> by Chris Nager (<a href='http://codepen.io/chrisnager'>@chrisnager</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

I had an epiphany yesterday. An inline element, when set to `vertical-align: middle`,  nested inside a block-level element causes the content in the block level element to center perfectly.

<!-- more -->

Take, for example, an image with text next to it. To vertically center that text relative to the image's height, you would need to add `vertical-align: middle` to the `img`.

<img src="http://dl.dropboxusercontent.com/u/5066613/cn-logo-icon.png" alt="ChrisNager.com" style="width:80px;margin-bottom:0;vertical-align:middle"> This is my logo

{% highlight html %}
<div><img src="logo.png" style="vertical-align:middle"> This is my logo.</div>
{% endhighlight %}

This happens because `img` is an inline element. Pseudo elements also render as inline elements. Aha! So, if you were not planning on using an image next to the text, you don't need an unsemantic, empty inline element. Just use an `:after` pseudo element.

{% highlight html %}
<div class="vertically-centered">…</div>
{% endhighlight %}

{% highlight css %}
.vertically-centered {
    height: 256px;
}

.vertically-centered:after {
    content: "";
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}
{% endhighlight %}

Simple, semantic, and IE8+ compatible.

<small>After figuring all this out, I later found that I was not the first to think of this, but in fact similar [solutions](http://css-tricks.com/centering-in-the-unknown/) had been documented years ago. But hey, I'm proud to arrive at this on my own and glad to share it with the web design/dev community.</small>
