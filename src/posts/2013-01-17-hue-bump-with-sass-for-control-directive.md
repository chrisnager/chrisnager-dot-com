---
author: ChrisNager
comments: false
date: 2013-01-17 21:47:04+00:00
layout: post
slug: hue-bump-with-sass-for-control-directive
title: Hue bump with Sass @for control directive
wordpress_id: 572
categories:
- CSS
tags:
- css
- CSS3
- for loop
- Sass
---

Sass has a set of powerful control directives that I find fascinating: `@if`, `@for`, `@while`, and `@each`.

In my "hue bump" experiment, I used a `@for` loop in Sass along with the `nth-of-type` CSS pseudo class to bump up the hue of each word.

{% highlight scss %}
$hue-bump: 15;

@for $n from 2 through 6 {
    h1:nth-of-type(#{$n}) {
        color: hsl($n * $hue-bump, 100%, 50%);
    }
}
{% endhighlight %}

I looped from the second header (`h1:nth-of-type(2)`) to the sixth header (`h1:nth-of-type(6)`) adding 15 (or the `$hue-bump` amount) more to the hue number in each header’s `hsl` value.

<pre class="codepen" data-height="470" data-type="result" data-href="zwgJC" data-user="ChrisNager" data-safe="true"><code></code><a href="http://codepen.io/ChrisNager/pen/zwgJC">Check out this Pen!</a></pre>
<script async src="http://codepen.io/assets/embed/ei.js"></script>
