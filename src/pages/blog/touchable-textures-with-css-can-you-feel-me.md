---
author: ChrisNager
comments: false
date: 2012-10-18 19:58:08+00:00
layout: post
slug: touchable-textures-with-css-can-you-feel-me
title: Touchable textures with CSS - can you feel me?
wordpress_id: 264
categories:
- Future CSS
post_format:
- Standard
tags:
- css
- haptics
- textures
---

<p class="intro-img"><a href="http://chrisnager.com/assets/touch-cat-2.png"><img src="http://chrisnager.com/assets/touch-cat-2.png" alt="Touchable cat drawing" title="Touchable cat" width="600" height="223"></a></p>

<h1 class="intro">Touch is the simplest and one of the most powerful forms of communication.</h1>

In this article, I will take a look into the possible future of CSS, the presentation layer of the web. I will be exploring touchable textures and how they could be applied in CSS to texture-enabled devices. By textures, I'm referring to the feeling of three dimensional surfaces like, smooth or bumpy, applied to a two dimensional surface of a device (or future 3D surfaces). Though this type of technology may not be readily available today, it's certainly fun to imagine how texture styles may be implemented.

<p class="alert"><strong>Experimental code ahead.</strong> The following code doesn't exist…yet.</p>

My (rather crude) proposal is for a `texture` property in CSS:

{% highlight css %}
.surface {
    texture: smooth;
}
{% endhighlight %}

<p>Of course, we would need to include our browser specific versions: <img src="http://chrisnager.com/v2/wp-includes/images/smilies/icon_wink.gif" alt=";)" class="wp-smiley"></p>

{% highlight css %}
.surface {
    -webkit-texture: smooth;
     -khtml-texture: smooth;
       -moz-texture: smooth;
        -ms-texture: smooth;
         -o-texture: smooth;
            texture: smooth;
}
{% endhighlight %}

<h1>Properties</h1>

<p>Possible `texture` properties (most ranging from 0 to 1, similar to `opacity`):</p>

{% highlight css %}
.surface {
    texture-temperature: cool | warm | 77°F | 25°C;
    texture-adhesion: 0.15;
    texture-hardness: 1;
    texture-roughness: 0.3;
    texture-malleability: 0.6;
    texture-viscosity: 0.75;
    texture-density: 0.3;
}
{% endhighlight %}

<p>In shorthand, you'd only include the properties that are necessary (similar to `transform` values):</p>

{% highlight css %}
.surface {
    texture: temperature(25°C) adhesion(0.75) roughness(0.4);
}
{% endhighlight %}

<p>And store your custom `texture` for reuse (similar to @keyframes):</p>

{% highlight css %}
@texture grippy {
    texture: adhesion(1) roughness(0.5);
}

::-webkit-resizer {
    texture: grippy;
}
{% endhighlight %}

<h1>Pre-defined values</h1>

<p>The `texture` values would have standard, pre-defined value names as strings the same way we already have color values like `cadetblue` and transition values like `ease-in-out`.</p>

{% highlight css %}
texture: smooth | course | grainy | sharp | raised | bumpy | sticky | fabric | glass | metallic | rubbery | depressed | detect* | inherit;
{% endhighlight %}

<p>`detect` would choose the best texture based on the look of the element.</p>

<p>Browsers may handle these defaults differently, so I assume we could end up with vendor-prefixed values like `-webkit-smooth` as well.</p>

<hr>

<p>The ability to build out the 3D surfaces of your textures would be possible through the use of technologies like `WebGL`*, `svg3d`, and possibly `matrix3d` (similar to how the CSS `transform` property works).</p>

<p>*Texture could be implemented with WebGL something like [this](//www.webdev20.pl/skins/default/js/demos/3d_grapher/webgl_ploter.html). <i>[Credit goes to [Małgorzata Jatczyk](//plus.google.com/118328547579245186440/posts) for this awesome experiment].</i></p>

<h1>Enhance</h1>

<p>These styles would work perfectly when designing with progressive enhancement in mind because browsers that couldn't read the `texture` property, would simply ignore it (just like `rgba` colors or `opacity`). The `texture` property could be feature-detected in JavaScript with something like [Modernizr](//modernizr.com/) to check if the device is able to apply textures. Apps that depend on touchable textures may need to offer other ways of handling functionality on non-texture-enabled devices.</p>

{% highlight js %}
if (!Modernizr.textures) {
    // Non-texture-based solution here
}
{% endhighlight %}

{% highlight css %}
.no-textures {
    /* Non-texture-based CSS solution here */
}
{% endhighlight %}

# Putting `texture` to use

<p>These textures may start off being implemented in a rather dull way at first or considered more novelty than practical, but over time devices would most assuredly be able to render complex 3D textures. Here are some ways developers could use textures.</p>

<h2>Accessibility</h2>

<p>Touchable textures would open up a whole new level of accessibility. Everyday smartphones and tablets could become much more powerful assistive devices.</p>

<p>We could bring Braille to mobile devices:</p>

{% highlight css %}
.assistive-touch-device {
    texture: smooth;
}
.assistive-touch-device-text {
    font-family: Braille;
    texture: raised*;
}
{% endhighlight %}

<p>*`raised` would represent a two dimensional texture that is raised slightly off the page like an embossed business card.</p>


<hr>


<p>Typing on your on-screen tablet keyboard:</p>

<style>
.home-row {
    margin-bottom: 2.125em;
    text-align: center;
}
.home-row .key {
    box-sizing: border-box;
    width: 2.5em;
    height: 2.5em;
    margin: 0.055em;
    border-width: 1px;
    border-radius: 3px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    font: 1em sans-serif;
    text-align: center;
    color: rgba(0, 0, 0, 0.85);
    background: #f9f9f9;
}
.home-row .key:hover {
    background: #f3f3f3;
}
.home-row .f-key:after,
.home-row .j-key:after {
    content: "·";
    position: absolute;
    bottom: -0.2em;
    left: 1.02em;
}
</style>

<div class="home-row">
<button class="key">A</button><button class="key">S</button><button class="key">D</button><button class="key f-key">F</button><button class="key">G</button><button class="key">H</button><button class="key j-key">J</button><button class="key">K</button><button class="key">L</button><button class="key">;</button>
</div>

{% highlight css %}
.key {
    …
    texture: smooth;
}
.key:active {
    texture: pressed;
}
.f-key:after,
.j-key:after {
    content: "·";
    …
    texture: raised;
}
{% endhighlight %}

<h2>Gaming</h2>

<p>Touchable textures in games would be pretty crazy.</p>

<p>Think about a game where the player rubs a metallic, somewhat adhesive surface until it reveals a smooth plastic texture that unveils a graphic or number, similar to how someone would scratch a lottery ticket to see if they'd won.</p>

<p>Or how riding on a sidewalk in a skateboarding game might be written:</p>

{% highlight css %}
@texture concrete {
    texture: temperature(85°F) hardness(1) roughness(1);
}
@keyframes riding-on-a-sidewalk-square {
    0%,
    89%,
    91%,
    99% { texture: concrete; };
    90%,
    100% { texture: bumpy; }
}

.riding .sidewalk-square {
    animation: riding-on-a-sidewalk-square 1s;
}

{% endhighlight %}

<h1>Usability</h1>

<p>You could engage on a deeper emotional level with your users through the textures of your buttons:</p>

{% highlight css %}
.btn-success {
    texture: temperature(warm) roughness(0);
}
.btn-danger {
    texture: temperature(cold) roughness(1);
}
{% endhighlight %}

<h1>Onward!</h1>

<p>My examples are simple implementations of my proposed `texture` property. My hope is by this point you've thought of many new ways CSS textures could be used and maybe better ways it could be implemented.</p>

<p><strong>The advancement of the web lies in our hands, but more importantly in our imagination.</strong></p>

<hr>

<p>EDIT: <a href="//www.youtube.com/watch?v=g7fmAxOVOmk&noredirect=1">Looks like touchable texture technology is on its way!</a></p>
