---
author: ChrisNager
comments: false
date: 2012-12-21 18:39:38+00:00
layout: post
slug: display-icons-with-custom-data-attributes
title: Display icons with custom data-attributes
wordpress_id: 555
categories:
- CSS
tags:
- data-attributes
- html5
- icons
---

<pre class="codepen" data-height="220" data-type="result" data-href="blips" data-user="ChrisNager" data-safe="true"><code></code></pre>
<script async src="http://codepen.io/assets/embed/ei.js"></script>

Here is a way to set matching icons to your labels all without leaving your HTML.

Just create a new `data-icon` attribute on your tag that contains your label and set it equal to the icon you would like to use.

{% highlight html %}
<li data-icon=★>Favorites</li>
{% endhighlight %}

And then set your CSS to display the `data-icon` attribute `before` the label.

{% highlight css %}
li:before {
    content: attr( data-icon );
}
{% endhighlight %}

On a side note: `attr()` works in IE8+.

That's it. Happy holidays.
