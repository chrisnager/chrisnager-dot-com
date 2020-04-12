---
author: ChrisNager
date: 2016-03-09
layout: post
slug: stack-your-classes-within-template-literals
title: Stack your classes within template literals
tags:
- css
- basscss
- react
- js
- es2015
---

![Stacked stones](/img/stones.jpg)

The purpose of this article is to share a simple technique I use that involves [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), a useful feature of ES2015+. Template literals allow you to write multi line strings enclosed in back ticks, eliminating the need to escape each line with a backslash or having to concatenate each line with `+`.

```js
`All
 day
 breakfast`
```

instead of:

```js
'All\
 day\
 breakfast'

// or

'All ' +
'day ' +
'breakfast'
```

Template literal multi line strings are much cleaner!

It gets better. You can use `${}` to denote a placeholder for a JavaScript expression, such as a variable or function. You can use placeholders inside your template literals like this:

```js
const friend = 'Chris Nager'

console.log(`Hello, ${friend}.`)

// Hello, Chris Nager.
```

Two extremely useful UI libraries I use in many projects are [React](https://facebook.github.io/react) and [Basscss](http://www.basscss.com). They play nicely together because Basscss’s single purpose classes make style declarations predictable and are especially useful when working with reusable components in React. The following technique doesn’t require React or Basscss as dependencies, but I’ll use them to illustrate my point.

Within my React components, I stack my CSS classes in a template literal. This gives me the added benefit of clearly defining my props- and logic-based styles with placeholders.

```js
import React, {
  Component,
} from 'react'

class Box extends Component {
  render() {
    const {
      color,
      isActive,
    } = this.props

    return (
      <div className={`
        h1
        p2
        border
        italic
        ${color}
        ${isActive && 'bold'}
      `}>
        {color}
      </div>
    )
  }
}

React.render(
  <Box
    color="teal"
    isActive
  />,
  document.body
)
```

See [this demo on CodePen](http://codepen.io/chrisnager/pen/vGNNXa/?editors=0010).

Writing your classes in a multi line stack has a few advantages. It’s better organized and more readable than a long single line of many classes.

When working with git, the main advantage of multi line stacked classes is that you can see your changes by line and know exactly what classes have been added or removed.

```shell
$ git diff
   return (
     <div className={`
       h1
-      p2
+      p3
      border
      italic
      ${color}
```

If you find this technique useful, ❤ this article. If you have any thoughts on the subject, let me know in the comments or reach out to me on Twitter [@chrisnager](http://twitter.com/chrisnager).

_Cross posted on [Medium](https://medium.com/@chrisnager/stack-your-classes-within-template-literals-d537bf463d4a)_.
