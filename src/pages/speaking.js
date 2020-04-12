/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'
import { Link } from 'gatsby'
import Layout from '../components/layout'

const projects = [
  {
    title: `Lifecycle of an icon`, // Mar 8, 2019
    summary: `Our icon creation process, from ideation to implementation`,
    link: `https://twitter.com/chrisnager/status/1104089402228256770`,
  },
  {
    title: `Zephyr`,
    summary: `A deep dive into our design system at Air`,
    link: `/zephyr`,
  },
  {
    title: `Design system`,
    summary: `Part 1: Typography, icons, and documentation`, // July 9 2018
  },
  { title: `IEX Internal Company Presentation`, summary: `React: The library that powers our apps` },
  { title: `IEX Internal Company Presentation`, summary: `Say hello to the IEX API` },
  {
    title: `TechCrunch Disrupt Hackathon Presentation 2017`,
    summary: `When - Chatbot for location recommendations`,
    link: `https://techcrunch.com/video/whentho/591879ff1de5a12724606c06`,
  },
  { title: `Salesforce Internal UX and Engineering Presentation`, summary: `A new era for CSS` },
  {
    title: `TechCrunch Disrupt Hackathon Presentation 2015`,
    summary: `Cheer me up - Fun, custom pages in seconds`,
    link: `https://techcrunch.com/video/cheer-me-up/518803581`,
  },
  {
    title: `TechCrunch Disrupt Hackathon Presentation 2014`,
    summary: `Jaunt - Let your friends be your city guides.`,
    link: `http://ustre.am/_3bGTL:2613`,
  },
  { title: `Salesforce Internal UX and Engineering Presentation`, summary: `Front End Standards` },
  { title: `Scotch Time Tech & Design Podcast`, summary: `Working with Devs` },
  { title: `BarCamp`, summary: `CSS3 Playground` },
  { title: `Luckie Internal Design Presentation`, summary: `CSS3 Capabilities` },
]

export default () => {
  return (
    <Layout>
      <Box sx={{ px: 3 }}>
        <Text as="h1">Speaking</Text>
        <Text as="p" sx={{ my: 3 }}>
          Fun stuff I've presented
        </Text>

        <Box as="ul" sx={{ my: 0, pl: 0 }}>
          {projects.map(project => (
            <Box
              key={project.summary}
              as={project.link ? Link : `div`}
              to={project.link ? project.link : undefined}
              sx={{ mt: 4, display: `block`, ':hover': { textDecoration: `none` } }}
            >
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
