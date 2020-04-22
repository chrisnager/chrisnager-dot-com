/** @jsx jsx */

import { graphql } from 'gatsby'
import { FC } from 'react'
import Helmet from 'react-helmet'
import { Box, jsx } from 'theme-ui'

import Features from '../components/features'
import Hero from '../components/hero'
import Layout from '../components/layout'

export interface HomeProps {
  data: any
}

const Home: FC<HomeProps> = ({ data }) => {
  return (
    <Layout>
      <Helmet title={data.allDataYaml.edges[0].node.title} />
      <Box sx={{ maxWidth: `55ch` }}>
        <Hero data={data.allDataYaml.edges[0].node} />
        <Features data={data.allFeaturesYaml.edges} />
      </Box>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query HomeQuery {
    allDataYaml {
      edges {
        node {
          title
          description
        }
      }
    }
    allFeaturesYaml {
      edges {
        node {
          link
          title
          category
        }
      }
    }
  }
`

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

//     <title>Chris Nager</title>

//     <meta name="viewport" content="width=device-width" />

//     <meta property="og:title" content="Chris Nager" />
//     <meta property="og:image" content="http://chrisnager.com/img/logo.png" />
//     <meta
//       property="og:description"
//       content="Designer & developer in Brooklyn, NY with a clean aesthetic and a focus on performance"
//     />
//     <meta property="fb:admins" content="41803347" />

//     <meta name="twitter:card" content="summary" />
//     <meta name="twitter:site" content="@chrisnager" />
//     <meta name="twitter:creator" content="@chrisnager" />
//     <meta name="twitter:url" content="http://chrisnager.com" />
//     <meta name="twitter:title" content="Chris Nager" />
//     <meta
//       name="twitter:description"
//       content="Designer & developer in Brooklyn, NY with a clean aesthetic and a focus on performance"
//     />
//     <meta name="twitter:image" content="http://chrisnager.com/img/logo.png" />

//     <meta name="application-name" content="chrisnager.com" />
//     <meta name="msapplication-TileColor" content="#00ccff" />
//     <meta name="msapplication-TileImage" content="http://chrisnager.com/img/logo.png" />

//     <link rel="index" title="Chris Nager" href="http://chrisnager.com/" />
//     <link rel="next" title="Portfolio" href="http://chrisnager.com/portfolio/" />

//     <link rel="canonical" href="http://chrisnager.com/" />
//     <link rel="shortcut icon" href="http://chrisnager.com/img/logo.png" />
//     <link rel="icon" type="image/png" href="http://chrisnager.com/img/logo.png" />
//     <link rel="apple-touch-icon" href="http://chrisnager.com/img/logo.png" />

//     <style>
//       body {
//         --color: crimson;
//         --wght: 900;

//         margin: 0;
//         font: 1em/1.5 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', system-ui, sans-serif;
//         font: 1em/1.5 system-ui, sans-serif;
//       }

//       /* @media (prefers-color-scheme: dark) {
//         body {
//           --color: #0cf;

//           background-color: #000;
//           color: #f7f7f7;
//         }
//       } */

//       @media (prefers-reduced-motion: reduce) {
//         * {
//           animation: none !important;
//         }
//       }

//       a {
//         color: var(--color);
//         text-decoration: none;
//       }

//       a:hover {
//         text-decoration: underline;
//       }

//       h1 {
//         margin-top: 0;
//         margin-bottom: 0;
//         font-size: 56px;
//         line-height: 1.07143;
//         font-weight: 600;
//         letter-spacing: -0.005em;
//       }

//       h2 {
//         margin-bottom: 0;
//         font-size: 27px;
//         line-height: 1.14815;
//         font-weight: 400;
//         letter-spacing: 0.008em;
//         margin-top: 6px;
//       }

//       p {
//         margin-top: 0;
//         margin-bottom: 0;
//         font-size: 26px;
//         line-height: 1.15385;
//         font-weight: 700;
//         letter-spacing: 0.002em;
//       }

//       small {
//         font-size: 19px;
//         line-height: 1.26316;
//         font-weight: 600;
//         letter-spacing: 0.0045em;
//       }

//       header {
//         padding: 2rem;
//       }

//       .logo {
//         /* display: flex; */
//         /* justify-content: space-between; */
//       }

//       .tagline {
//         padding-bottom: 2.75rem;
//         border-bottom: 2px solid;
//       }

//       .ampersand {
//         font-family: Baskerville, sans-serif;
//         font-style: italic;
//       }

//       main {
//         padding: 2rem;
//       }

//       .title {
//         margin-top: 50px;
//         margin-bottom: 0;
//         font-size: 150px;
//         line-height: 0.66667;
//         font-weight: 700;
//         letter-spacing: -0.015em;
//         font-variation-settings: 'wght' var(--wght);
//       }

//       .description {
//         margin-top: 50px;
//         margin-bottom: 0;
//         font-size: 64px;
//         line-height: 1.0625;
//         font-weight: 700;
//         letter-spacing: -0.0045em;
//       }

//       .description > a:nth-of-type(1) {
//         color: #0cd;
//       }

//       .description > a:nth-of-type(2) {
//         color: #0cb;
//       }

//       .description > a:nth-of-type(3) {
//         color: #0c9;
//       }

//       .description:nth-of-type(3) > a:nth-of-type(1) {
//         color: #0c7;
//       }

//       .description > a > span > span:nth-of-type(1) {
//         color: green;
//       }
//       .description > a > span > span:nth-of-type(2) {
//         color: white;
//       }
//       .description > a > span > span:nth-of-type(3) {
//         color: blue;
//       }
//       .description > a > span > span:nth-of-type(4) {
//         color: orange;
//       }
//       .description > a > span > span:nth-of-type(5) {
//         color: yellow;
//       }
//       .description > a > span > span:nth-of-type(6) {
//         color: red;
//       }

//       .G {
//         width: 68px;
//         height: 68px;
//         border-radius: 4rem;
//         display: inline-flex;
//         color: white;
//         background-color: limegreen;
//         justify-content: center;
//         align-items: center;
//       }

//       footer {
//         padding: 2rem;
//       }

//       footer > div {
//         margin-bottom: 3rem;
//         border-top: 2px solid;
//         padding-top: 2rem;
//         font-size: 26px;
//         line-height: 1.15385;
//         font-weight: 700;
//         letter-spacing: 0.002em;
//       }
//     </style>
//   </head>

//   <body>
//     <header>
//       <h1 class="logo-container">
//         <a class="logo" href="/">
//           <span>C</span><span>h</span><span>r</span><span>i</span><span>s</span> <span>N</span><span>a</span
//           ><span>g</span><span>e</span><span>r</span>
//         </a>
//       </h1>
//       <h2 class="tagline">
//         Designer <span class="ampersand">&</span> developer in Brooklyn, NY with a clean aesthetic and a focus on
//         performance
//       </h2>
//     </header>

//     <main>
//       <h1 class="title">Hi, I’m Chris.</h1>

//       <p class="description">
//         Nice to see you. I love <a href="/projects">building things</a>, both as a hobby and career. I like learning and
//         teaching. Brooklyn-based, I'm the guy on the <span class="G">G</span> <span class="G2">Ⓖ</span> train
//         <a href="https://twitter.com/chrisnager/status/1079881117396799488"
//           >speed-solving my
//           <span><span>R</span><span>u</span><span>b</span><span>i</span><span>k</span><span>'s</span></span> cube</a
//         >.
//       </p>

//       <p class="description">
//         I'm on the founding team at a <a href="https://air.inc">media asset workflow company</a>. I helped
//         <a href="https://iextrading.com">launch a stock exchange</a>. I've
//         <a href="https://www.salesforce.com">built products that thousands use</a>.
//       </p>

//       <p class="description">
//         I like to write articles and give talks about things I learn or know about. Here's a
//         <a href="https://twitter.com/chrisnager/status/1104089402228256770">recent presentation</a> where I talked about
//         a design system + icon theming tool I built.
//       </p>

//       <p class="description">
//         I'm passionate about my craft. Having a both a design and development background, I take a systematic approach
//         to solving problems. Accessibilty and performance are two things I care deeply about. I create usable,
//         responsive, future-friendly sites and apps.
//       </p>

//       <p class="description">
//         Things I use, in no particular order: a11y, i18n, usability, responsive future-friendly sites and apps, HTML5,
//         CSS3, JavaScript, React, React Native, TypeScript, Node.js, PostCSS, Pug, Haml, Sass, BEM, OOCSS, RWD, Markdown,
//         PHP, Gulp, npm, Yarn, Jekyll, Vim, Git, MDX, React Native Web, recompose, Redux, React Hooks, webpack, CSS Grid,
//         CSS Flexbox, Jest, CSS Animation, VS Code, React Hooks, styled-components, GraphQL, Gatsby
//       </p>
//     </main>

//     <footer>
//       <div>
//         Reach out:
//         <a href="https://twitter.com/chrisnager">Twitter</a> + <a href="https://codepen.io/chrisnager">CodePen</a> +
//         <a href="https://github.com/chrisnager">GitHub</a> +
//         <a href="https://www.linkedin.com/in/chrisnager">LinkedIn</a> +
//         <a href="https://dribbble.com/chrisnager">Dribbble</a> + chris[at]chrisnager.com
//       </div>

//       <p>
//         I'm currently working as a Senior Product Engineer at <a href="https://air.inc">Air</a> and was previously at
//         <a href="https://iextrading.com">IEX</a> and <a href="https://www.salesforce.com">Salesforce</a>.
//       </p>

//       <p>
//         <small>&copy; <span class="current-year"></span> Chris Nager</small>
//       </p>
//     </footer>

//     <script>
//       document.getElementsByClassName('current-year')[0].innerHTML = new Date().getFullYear();
//     </script>

//     <script>
//       document.body.style.setProperty('--wght', 100);
//     </script>

//     <script>
//       const title = document.getElementsByClassName('title')[0];
//       const letters = title.textContent.split('');

//       title.innerHTML = '';

//       letters.forEach((letter, index) => {
//         const span = document.createElement('span');

//         span.innerHTML = letter;
//         span.id = `title-${index}`;
//         span.style.cssText = `font-variation-settings: "wght" calc(var(--wght) * ${index / 1.5} + 50)`;
//         title.appendChild(span);
//       });
//     </script>

//     <script>
//       (function(b, o, i, l, e, r) {
//         b.GoogleAnalyticsObject = l;
//         b[l] ||
//           (b[l] = function() {
//             (b[l].q = b[l].q || []).push(arguments);
//           });
//         b[l].l = +new Date();
//         e = o.createElement(i);
//         r = o.getElementsByTagName(i)[0];
//         e.src = '//www.google-analytics.com/analytics.js';
//         r.parentNode.insertBefore(e, r);
//       })(window, document, 'script', 'ga');
//       ga('create', 'UA-3632655-1');
//       ga('send', 'pageview');
//     </script>
//   </body>
// </html>
