/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const projects = [
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
      <Box sx={{ px: 3 }}>
        <Text as="h1" sx={{ fontWeight: 500 }}>
          Projects
        </Text>
        <Text as="p" sx={{ my: 3 }}>
          Fun stuff I've built
        </Text>

        <Box as="ul" sx={{ my: 0, pl: 0 }}>
          {projects.map(project => (
            <Box key={project.title} as={Link} sx={{ mt: 4, display: `block`, ':hover': { textDecoration: `none` } }}>
              <Text as="h1" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                {project.title}
              </Text>
              <Text as="p" sx={{ mt: 1, color: `var(--color)`, 'a:hover > &': { color: `var(--color)` } }}>
                {project.summary}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  )
}
