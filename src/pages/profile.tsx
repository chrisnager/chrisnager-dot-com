/** @jsx jsx */

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import { Box, jsx, Text } from 'theme-ui'

import Layout from '../components/layout'

const ProfileIndex = ({ data }) => {
  return (
    <Layout>
      {/* 
        // @ts-ignore */}
      <Helmet title="Profile / Chris Nager" />
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Text as="h1">Profile</Text>
        <Text as="p" sx={{ my: 3, fontSize: 4 }}>
          I'm a front end engineer with a background in design, a minimalist aesthetic, and a deep concern for
          performance and accessibility.
        </Text>

        <Img fluid={data.file.childImageSharp.fluid} alt="Hat" />

        <p>
          I’m a software engineer with a background in design. My design and code come from a deep concern for
          performance and accessibility.
        </p>

        <p>
          I’ve worked in many industries, from Advertising to Finance. I’ve been part of a{` `}
          <a
            href="https://www.adweek.com/digital/salesforce-buys-buddy-media-689-million-140913/"
            target="_blank"
            rel="noopener noreferrer"
          >
            near-billion dollar acquisition
          </a>
          , built{' '}
          <a href="https://salesforce.com" target="_blank" rel="noopener noreferrer">
            products millions have used
          </a>
          , helped{` `}
          <a
            href="https://www.nytimes.com/2016/06/18/business/dealbook/iex-group-gains-approval-for-stock-exchange.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            launch America’s newest stock exchange
          </a>
          , most recently was a founding member of a{' '}
          <a href="https://air.inc" target="_blank" rel="noopener noreferrer">
            ground-level SAAS startup
          </a>
          , and am now ready for a new challenge.
        </p>

        <p>
          Pre-quarantine, you may have seen me on the G train,{' '}
          <a href="https://www.instagram.com/p/BsE0AVMCUnt/">speed-solving my Rubik’s cube</a>.
        </p>

        <p>
          I specialize in UX (User Experience) and DX (Developer Experience). My current passion stack is React, React
          Native, TypeScript. Aside from these buzzword skills, what truly sets my work apart is my (deep) understanding
          of CSS. I know when and how to use grid layouts and truly understanding the cascade. I’m particularly proud of
          Zephyr, the design system I created for Air. It’s built in TypeScript and includes including cross-platform
          foundations and components.
        </p>

        <p>I’ve had opportunities to speak about my process and I host internal company teach-ins when appropriate.</p>

        <p>I learn everyday and have a passion for mentoring. As a team leader,</p>

        <p>I’ve launched web, iOS, and Android apps for companies ranging from small to Coca Cola.</p>

        <p>I am in constant search of purpose-driven work.</p>
      </Box>
    </Layout>
  )
}

export default ProfileIndex

export const pageQuery = graphql`
  query ProfileQuery {
    file(relativePath: { eq: "images/hat.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

// export const pageQuery = graphql`
//   query ProfileQuery {
//     allContentfulPerson(filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }) {
//       edges {
//         node {
//           heroImage: image {
//             fluid(maxWidth: 1150, resizingBehavior: PAD, background: "rgb:000000")
//           }
//         }
//       }
//     }
//   }
// `

/*
---
layout: default
title: Profile · Chris Nager
page-class: page--profile
permalink: /profile/
---

# Hi, I'm Chris.

I create usable, responsive, future-friendly sites and apps with HTML5, CSS3, JavaScript, React, React Native, Node.js, PostCSS, Pug, Haml, Sass, BEM, OOCSS, RWD, Markdown, PHP, Gulp, npm, Yarn, Jekyll, Vim, and Git.

<a href="https://www.instagram.com/chrisnager"><img class="profile-image" src="/img/hat.jpg" alt="Chris Nager wearing his favorite Alabama hat" title="Chris Nager wearing his favorite Alabama hat"></a>

I'm ambitious, self-driven, and enthusiastic about the future of the web. I currently work in Brooklyn, New York as a Senior Software Developer at Air, previously at IEX and Salesforce.com. Using the latest web technologies and languages, I strive to build beautifully designed and masterfully coded websites and apps. I continually learn from and contribute to the web community and constantly find myself taking on self-initiated [side projects](/projects). I merge the gap between designer and developer by taking my designs from pen and paper to usable, performance-first online experiences.

[Say hello](mailto:chris@chrisnager.com).

---

# Experience

## Air

### Senior Software Developer

Build a video management web application, build Air's website, lead a team of junior developers, work on a video capture iOS application, architect a universal, cross-platform code management system, improve performance and accessibility across our systems, enhance our apps' user experience, build out an extensible and maintainable SVG icon system, meet with investors, and assist in launching our products.

## IEX

### Front End Engineer, UX

Built IEX's website, web applications, iOS and Android applications, web API, design systems, marketing, and company branding.

## Salesforce.com

### Front End Engineer, Member of Technical Staff, Engineering

Built a scalable and maintainable front end that spans across our range of products. Document proper ways to implement our front end standards. Continuously update the front end bootstrap style guide with new design and code examples. Improve front end performance throughout our products.

## Salesforce.com

### Front End Engineer, Product Vision & Prototypes

Built prototypes for product demos shown at Dreamforce, Social.com launch, Connections, and other large salesforce.com conventions. Built the front end for our Publish, Engage, and Social.com products. Implemented a company wide front end bootstrap style guide with design and code examples used by the entire Marketing Cloud.

## Buddy Media

### Front End Engineer

Built Facebook landing pages for major brands such as Coca-Cola, Unilever, and Walmart, developed a CSS style guide for our team to follow, created an internal app built in Less to generate themed stylesheets for our team to simplify and speed up our workflow, crafted ideas and implementations for Command Centers.

## Luckie & Co.

### Digital Designer & Front End Developer

Worked on projects for major clients like Regions, Bayer Advanced, Little Debbie, AT&T, Alabama Tourism, Gulf Power and McAlister’s Deli. Was responsible for designing and slicing user interfaces for websites and web apps in both Adobe Photoshop/Illustrator as well as designing directly in the browser with HTML5 and CSS3. Developed websites, mobile websites, web apps, Facebook apps, UI style guides and responsively designed sites with HTML5, CSS3, WordPress and basic jQuery. Worked in conjunction with our Interactive team and Creative team to complete projects by taking on multiple tasks at one time and adhering to strict deadlines. Designed sitemaps, wireframes, mockups, style guides, social media templates, banner ads, and prepare image assets for websites. Worked in Ruby on Rails environments with our back-end developers.

## Samford University

### Web Design Intern

Designed and developed websites from scratch with Adobe Photoshop, HTML and CSS. Worked closely with the digital team at Samford University designing and developing Samford sites and landing pages. Helped roll out the rebranded Samford University main site.

## Blue Fish Design Studio

### Interactive Design Intern

Designed, sliced and developed website templates in Adobe Fireworks, Adobe Photoshop, HTML and CSS. Worked in the Expression Engine content management system. Designed sites for a number of Blue Fish Design Studio's clients.

---

# Education

## Samford University

Bachelor of Arts, Graphic Design & Minor, Business Administration
*/
