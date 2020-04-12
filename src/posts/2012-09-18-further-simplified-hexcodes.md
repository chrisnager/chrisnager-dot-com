---
author: ChrisNager
comments: true
date: 2012-09-18 03:24:55+00:00
layout: post
slug: further-simplified-hexcodes
title: Further simplified hexcodes
wordpress_id: 229
categories:
- Feature Requests
tags:
- css
- hexcodes
---

<style>
    [class^="color"] {
        margin: 1px 0;
        border-radius: 2px;
        padding: 0 6px;
        display: inline-block;
        color: white;
        background: #2faced;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5) inset;
    }
    .color2 { background: black; }
    .color3 { background: #ff1166; }
    .color4 { background: #161616; }
    .color5 { background: #333; }
    .color6 { background: #777; }
    .color7 { background: #b4b4b4; }
    .color8 { background: #5d5d5d; }
</style>

Hexadecimal codes, like <code class=color1>#2faced</code>, are interpreted as colors. [For a long time now](//twitter.com/ChrisNager/status/83651049558253568), I've wanted the ability to further shorten hexcodes.

Take for example the hexcode for the color black. It can be written as <code class=color2>#000000</code> or <code class=color2>#000</code>. I think we should also be able to write <code class=color2>#0</code> to represent black.

<!--more-->

To take this a step further, we know <code class=color3>#f16</code> is the shorthand for <code class=color3>#ff1166</code>, so why can't <code class=color4>#16</code> be the shorthand for <code class=color4>#161616</code>?

In my ideal world:<br>
<code class=color5>#3</code> would be equivalent to <code class=color5>#333333</code>,<br>
<code class=color6>#7</code> would be equivalent to <code class=color6>#777777</code>,<br>
<code class=color7>#b4</code> would be equivalent to <code class=color7>#b4b4b4</code>,<br>
<code class=color8>#5d</code> would be equivalent to <code class=color8>#5d5d5d</code>,<br>
et cetera, et cetera.

This technique seems like an appropriate short(er)hand for hexcodes and would save a tiny bit of time and bytes.
