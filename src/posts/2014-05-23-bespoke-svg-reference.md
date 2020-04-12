---
author: ChrisNager
comments: false
date: 2014-05-23 1:09:00+00:00
layout: post
slug: bespoke-svg-reference
title: Bespoke SVG Reference
categories:
- SVG
- Reference
---
## Learn to draw your own SVG shapes in the browser

The following commands can be used in the __d__ attribute within a __path__ to help you draw your own SVG shapes.

Like so:

```html
<svg viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z" />
</svg>
```

[_This code draws an SVG plus sign (+)_](http://codepen.io/chrisnager/pen/armzk).

A quick note:

- __Capital letter__ commands, like M, refer to __absolutely positioned__ points.
- __Lowercase letter__ commands, like m, refer to __relatively positioned__ points.

---

## M

moveto

_X,Y_

Begins the string at an absolute, designated position. If more than one pair of coordinates are provided, it’s as if the other pairs are preceded by an L.



## m

moveto

_x,y_

Same as M, except that if more than one pair of coordinates are provided, extra pairs are processed as if preceded by an l.



## L

lineto

_X,Y_

Draws a line from the last position to the specified position.



## l

lineto

_x,y_

Draws a line from the last position to a relative position: x pixels to the right and y to the bottom.



## H

horizontal lineto

_x_

Draws a horizontal line to the specified, absolute x position.



## h

horizontal lineto

_x_

Draws a horizontal line x pixels to the right (if x is negative, the line is drawn to the left).



## V

vertical lineto

_y_

Draws a vertical line to the specified, absolute y position.



## v

vertical lineto

_y_

Draws a vertical line x pixels to the bottom (if y is negative, the line is drawn to the top).



## A

elliptical arc

_rx,ry,alpha,large,sweep,x,y_

Draws an elliptical arc: rx and ry are the radius of the ellipse; alpha is the x-axis rotation of the ellipse; large is 0 if the arc should be the shorter arc (less than 180°), 1 if it should be the longer arc; sweep is 0 is the arc is to be drawn clockwise, 1 if counter-clockwise; x,y are the coordinate of the end point of the arc.



## Q

quadratic Bézier curve

_cX cY eX eY_

Draws a Bézier quadratic curve. cX,cY are the coordinates of the control point, eX,eY that of the endpoint. More pairs can be provided (extra control points and endpoints).



## q

quadratic Bézier curve

_cX cY eX eY_

Draws a Bézier quadratic curve, with the coordinates of the points relative to the current point.



## T

smooth quadratic Bézier curveto

_eX eY_

Draws a Bézier quadratic curve, using the last provided control point (or failing that the current point).



## t

smooth quadratic Bézier curveto

_eX eY_

Same as T, with the coordinates of the end point relative to the current point.



## C

curveto

_cX1 cY1 cX2 cY2 eX eY_

Draws a Bézier cubic curve, with cX1,cY1,cX2,cY2 being the coordinates of the control points.



## c

curveto

_cX1 cY1 cX2 cY2 eX eY_

Same as C, with the coordinates of the points relative to the current point.



## S

smooth curveto

_cX2 cY2 eX eY_

Draws a Bézier cubic curve, using the previously provided control point (cX1,xY1) or failing that the current point, cX2,cY2 as the next control point, and eX,eY as the end point



## s

smooth curveto

_cX2 cY2 eX eY_

Same as S, with the coordinates of the points relative to the current point.



## Z, z

closepath

Close the path by joining the ending point with the beginning point.

---

_Resources_:

[http://www.jeromecukier.net/wp-content/uploads/2012/10/d3-cheat-sheet.pdf](http://www.jeromecukier.net/wp-content/uploads/2012/10/d3-cheat-sheet.pdf)

[https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)

_Examples_:

[http://codepen.io/chrisnager/pen/armzk](http://codepen.io/chrisnager/pen/armzk)

_Original Medium article_:

[https://medium.com/@chrisnager/bespoke-svg-reference-e22eb733272](https://medium.com/@chrisnager/bespoke-svg-reference-e22eb733272)
