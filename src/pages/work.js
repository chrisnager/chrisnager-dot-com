/** @jsx jsx */

import { jsx, Box, Flex, Text } from 'theme-ui'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const projects = [
  { title: `Generative art`, summary: `Fun with generated patterns` },
  { title: `Emoonji`, summary: `A friendly chatbot that sends the current moon phases with emojis` },
  { title: `> Signum majoritatis`, summary: `A side-scrolling game built in a single string` },
  { title: `Give 'n' Go`, summary: `A curated gallery of Dribbble shots reworked as interactive CodePen pens` },
  { title: `Cheer me up`, summary: `Fun, custom pages in seconds` },
  { title: `ungrid`, summary: `the simplest responsive css grid` },
  {
    title: `Simple <paper-spinner>`,
    summary: `How to rebuild Google's Material Design <paper-spinner> with a single div and CSS animations`,
  },
  { title: `Until`, summary: `Are we there yet?` },
  {
    title: `UN Disaster Response`,
    summary: `Currently working with the Harvard Humanitarian Initiative on a disaster and humanitarian response survey building app to be used by the United Nations`,
  },
  { title: `Jaunt`, summary: `Let your friends be your city guides. (TechCrunch Disrupt Hackathon app entry)` },
  { title: `Cursors`, summary: `All available cursors` },
  { title: `simple-debug.css`, summary: `Debug your layouts with one line of CSS` },
  { title: `palette`, summary: `A simple color palette` },
  {
    title: `✂ short color names`,
    summary: `The 44 CSS color names that are as short as or shorter than their corresponding hexcodes.`,
  },
  { title: `hexcodes`, summary: `All possible three digit hexcodes` },
  {
    title: `tiny google fonts`,
    summary: `Strip down your google fonts significantly to only include the characters you're actually using`,
  },
  { title: `Birthday hex`, summary: `Find your birthday hexcode` },
  {
    title: `SVG Please`,
    summary: `Simple script to replace your bitmap icons with inline SVGs with bitmap fallback built in`,
  },
  { title: `#Fav5`, summary: `What are your five most important items?` },
  { title: `Twadlib!`, summary: `Ad-lib your tweets` },
  { title: `Bliss`, summary: `Beautifully lean, ideal style sheets` },
  { title: `Crafted CSS`, summary: `A personal compilation of CSS practices I follow` },
  { title: `Social Logos`, summary: `Download official social logos` },
  { title: `chrisnager.com v2`, summary: `Care to reminisce?` },
  { title: `Ben Thomson Photo`, summary: `Awwwards Site of the Day` },
  { title: `Totally Fresh`, summary: `Experimental CSS3 design featured on Smashing Magazine` },
]

export default () => {
  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Text as="h1">Projects</Text>
        <Text as="p" sx={{ my: 3, fontSize: 4 }}>
          Fun stuff I've built
        </Text>

        <Box as="ul" sx={{ my: 0, pl: 0, display: `grid` }}>
          {projects.map(project => (
            <Flex key={project.title} as={Link} to="/" sx={{ mt: 4, ':hover': { textDecoration: `none` } }}>
              <Box sx={{ size: 80, mr: 2, flex: `0 0 80px`, bg: `action` }} />
              <Box>
                <Text as="h1" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                  {project.title}
                </Text>
                <Text as="p" sx={{ color: `text`, 'a:hover > &': { color: `text` } }}>
                  {project.summary}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </Layout>
  )
}

/*
---
layout: default
title: Projects · Chris Nager
page-class: page--projects
permalink: /projects/
---

<ul class="projects">
    <li class="project">
        <a class="project__link" href="http://bit.do/emoonji">
            <h1 class="project__title">Emoonji</h1>
            <p class="project__description">A friendly chatbot that sends the current moon phases with emojis</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://bit.ly/smajor">
            <h1 class="project__title">
                <code>&gt;</code> Signum majoritatis</h1>
            <p class="project__description">A side-scrolling game built in a single string</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://give-n-go.co">
            <h1 class="project__title">Give 'n' Go</h1>
            <p class="project__description">A curated gallery of Dribbble shots reworked as interactive CodePen pens</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://cheermeup.website">
            <h1 class="project__title">Cheer me up</h1>
            <p class="project__description">Fun, custom pages in seconds</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/ungrid">
            <h1 class="project__title">ungrid</h1>
            <p class="project__description">the simplest responsive css grid</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/simple-paper-spinner">
            <h1 class="project__title">Simple
                <code>&lt;paper-spinner&gt;</code>
            </h1>
            <p class="project__description">How to rebuild Google's Material Design
                <code>&lt;paper-spinner&gt;</code> with a single div and CSS animations</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/until">
            <h1 class="project__title">Until</h1>
            <p class="project__description">Are we there yet?</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://vimeo.com/71911497">
            <h1 class="project__title">UN Disaster Response</h1>
            <p class="project__description">Currently working with the Harvard Humanitarian Initiative on a disaster and humanitarian response survey building
                app to be used by the United Nations</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://disruptnyhackathon.challengepost.com/submissions/23514-jaunt">
            <h1 class="project__title">Jaunt</h1>
            <p class="project__description">Let your friends be your city guides. (TechCrunch Disrupt Hackathon app entry)</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/cursors">
            <h1 class="project__title">Cursors</h1>
            <p class="project__description">All available cursors</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/simple-debug.css">
            <h1 class="project__title">simple-debug.css</h1>
            <p class="project__description">Debug your layouts with one line of CSS</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/palette">
            <h1 class="project__title">palette</h1>
            <p class="project__description">A simple color palette</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/short-color-names">
            <h1 class="project__title">&#9986; short color names</h1>
            <p class="project__description">The 44 CSS color names that are as short as or shorter than their corresponding hexcodes.</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/hexcodes">
            <h1 class="project__title">hexcodes</h1>
            <p class="project__description">All possible three digit hexcodes</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/tiny-google-fonts">
            <h1 class="project__title">tiny google fonts</h1>
            <p class="project__description">Strip down your google fonts significantly to only include the characters you're actually using</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/birthday-hex">
            <h1 class="project__title">Birthday hex</h1>
            <p class="project__description">Find your birthday hexcode</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/svg-please">
            <h1 class="project__title">SVG Please</h1>
            <p class="project__description">Simple script to replace your bitmap icons with inline SVGs with bitmap fallback built in</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://fav5.co">
            <h1 class="project__title">#Fav5</h1>
            <p class="project__description">What are your five most important items?</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/twadlib">
            <h1 class="project__title">Twadlib!</h1>
            <p class="project__description">Ad-lib your tweets</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/bliss">
            <h1 class="project__title">Bliss</h1>
            <p class="project__description">Beautifully lean, ideal style sheets</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/crafted-css">
            <h1 class="project__title">Crafted CSS</h1>
            <p class="project__description">A personal compilation of CSS practices I follow</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="/social-logos/">
            <h1 class="project__title">Social Logos</h1>
            <p class="project__description">Download official social logos</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://v2.chrisnager.com">
            <h1 class="project__title">chrisnager.com v2</h1>
            <p class="project__description">Care to reminisce?</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://www.awwwards.com/web-design-awards/ben-thomson-photography">
            <h1 class="project__title">Ben Thomson Photo</h1>
            <p class="project__description">Awwwards Site of the Day</p>
        </a>
    </li>

    <li class="project">
        <a class="project__link" href="http://coding.smashingmagazine.com/2010/07/12/css3-design-contest-results/">
            <h1 class="project__title">Totally Fresh</h1>
            <p class="project__description">Experimental CSS3 design featured on Smashing Magazine</p>
        </a>
    </li>
</ul>
*/
