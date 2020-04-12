---
author: ChrisNager
comments: false
date: 2013-03-25 20:40:14+00:00
layout: post
slug: time-based-media-queries
title: Time-based media queries
wordpress_id: 597
categories:
- CSS
- Feature request
- Future CSS
---

Wouldn't it be fun to be able to target our designs based on what season, day, or hour it is using CSS media queries?

<p class="alert"><strong>Experimental code ahead.</strong> The following code doesn't exist…yet.</p>

{% highlight css %}
/* Style for summer */
@media (time: from(2013-06-21) to(2013-09-21)) {
    html {
        background: radial-gradient(yellow, white);
    }
}
{% endhighlight %}

<!-- more -->

{% highlight css %}
/* Style for a birthday */
@media (time: 2013-09-12) {
    html {
        background: url(confetti.gif);
    }
}
{% endhighlight %}

{% highlight css %}
/* Style for the evening */
@media (time: from(17:00:00) to(21:00:00)) {
    html {
        background: darkblue;
    }
}
{% endhighlight %}
