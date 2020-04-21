---
author: ChrisNager
comments: false
date: 2012-11-08 19:36:58+00:00
layout: post
slug: natural-curves
title: Natural curves
wordpress_id: 471
categories:
- CSS3
tags:
- border-radius
- css
---

<pre class="codepen" data-height="340" data-type="result" data-href="CFjpK" data-user="ChrisNager"><code></code></pre>
<script async src="http://codepen.io:/assets/embed/ei.js"></script>

# HAML

{% highlight haml %}
.natural-curves
    .natural-curves-inner
        …
{% endhighlight %}

Let your bordered outer `div` determine the background<sup>1</sup> and its `border-radius`<sup>2</sup> will put a natural curve on the inner `div`.

If you set the background of the inner `div`, you will also need to set its `border-radius`<sup>3</sup> and you will lose your natural curves.

# CSS

{% highlight css %}
.natural-curves {
    border: 0.5em solid;
    border-radius: 1.5em; /* 2 */
    background: lightblue; /* 1 */
    …
}
.natural-curves-inner {
    overflow: hidden;

/* 3 */
/*
    border-radius: 1em;
    background: burlywood;

*/
}
{% endhighlight %}
