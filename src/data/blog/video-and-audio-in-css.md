---
author: ChrisNager
comments: false
date: 2012-12-04 22:11:50+00:00
layout: post
slug: video-and-audio-in-css
title: Video and audio in CSS
wordpress_id: 490
categories:
- Feature Requests
tags:
- audio
- css
- video
---

<h1 class="intro">Video, audio, and images are all types of multimedia.</h1>

Currently only images are aloud in our CSS. In many cases video and audio require controls and are a core part of the page content. Sometimes, though, they are strictly used as background decoration and do not require controls.

Let's say you want an infinitely-looping full screen video as your homepage background (like this one: [marisapassos.com](http://marisapassos.com/)). Your only option is to include it in your HTML. That works, but if the video is essentially decoration or serves as a supporting style for the real content (in the HTML), then I say it belongs in the presentational layer (the CSS).

<!-- more -->

Take this site as another example: [thecassette.fr](http://www.thecassette.fr/). Their video of the dancing shoes is clearly used for decoration. It sits in the background and loops creating a nice effect, making the page much more visually pleasing and adding to their branding.

Their video doesn't belong in the meat of the page as it is not content, but truly belongs in the CSS with all the other styling. The developers of this site even used a clever fallback image of the shoes for the browsers that didn't support their video (which happens to be an .swf file in this case, but could be any type of web video format).

<p class="alert"><strong>Experimental code ahead.</strong> The following code doesn't exist…yet.</p>

I would rewrite their background video in CSS something like this:

{% highlight css %}
.page {
        background: url(images/dots-grid.png),
                    url(video/dancing-shoes.webm),

                    /* Video fallback */
                    url(video/dancing-shoes.mp4),

                    /* Image fallback */
                    url(images/dancing-shoes.jpg);
        background-size: cover;
        background-play-state: running;
        background-iteration-count: infinite;
    }
{% endhighlight %}

On this site ([aboutblank.cz](http://www.aboutblank.cz/)), again, video is used to paint the page, but is not true content, and therefore does not belong in the HTML, but rather the CSS. When I disable all CSS styles on the page, I still see the video looping.

* * *

As for audio, I feel the same way, that if the audio is not content (like album tracks on a band's site) and belongs in the background, we should be able to send it to the CSS.

Chris Coyier wrote an interesting article in 2011 describing how to [play sound on `:hover`](http://css-tricks.com/play-sound-on-hover/). This method works, but wouldn't it be nice to be able to make this work purely with CSS without HTML or JS?

I think this would be quite awesome:

{% highlight css %}
.btn:hover {
    background-audio: src(audio/bloop.webm),

                      /* Audio fallback */
                      src(audio/bloop.mp3);
}
btn:active {
    background-audio: src(audio/tick.webm),

                      /* Audio fallback */
                      src(audio/tick.mp3);
}
{% endhighlight %}

Presentational elements belong in the CSS. If audio or video, like images and colors, are used as presentational elements, then they should be put in the CSS.
