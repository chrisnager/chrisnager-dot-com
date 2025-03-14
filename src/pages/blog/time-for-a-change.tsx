/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'

export interface BlogPostTimeForAChangeProps { }

const BlogPostTimeForAChange: FC<BlogPostTimeForAChangeProps> = () => {
  return (
    <Layout>
      <Box as="article" sx={{ maxInlineSize: `55ch`, marginBlockEnd: 5, paddingInline: 3 }}>
        <Intro
          date="April 23rd, 2020"
          title="Time for a change"
          description="I am proud to announce the new ChrisNager.com. This version is built with Gatsby and hosted on Netlify."
        />

        <p sx={{ fontFamily: `Georgia, serif` }}>
          I'm project managing myself and sticking to a plan. Feel free to{` `}
          <a
            href="https://www.notion.so/chrisnager/ChrisNager-com-a8e63b19f10a4b0580ff029355e28dd8"
            target="_blank"
            rel="noopener noreferrer"
          >
            track my progress
          </a>
          .
        </p>

        <a
          href="https://www.notion.so/chrisnager/ChrisNager-com-a8e63b19f10a4b0580ff029355e28dd8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Kanban board, titled 'ChrisNager.com', full of tasks"
            src="/images/blog/progress.png"
            sx={{ display: `block`, maxWidth: `100%` }}
          />
        </a>

        <p sx={{ fontFamily: `Georgia, serif` }}>My goals for this version of the site are making sure it:</p>
        <ul sx={{ fontFamily: `Georgia, serif` }}>
          <li>Tells my story</li>
          <li>Is fast</li>
          <li>Is accessible</li>
          <li>Can be used offline</li>
          <li>Includes a full-fledged dark mode</li>
          <li>Displays nicely on mobile</li>
          <li>Is easy to maintain and update</li>
          <li>Is fun to explore</li>
        </ul>
      </Box>
    </Layout>
  )
}

export default BlogPostTimeForAChange

export const Head = () => (
  <Halo
    title="Time for a change / Blog"
    url="https://chrisnager.com/blog/time-for-a-change"
    description="I am proud to announce the new ChrisNager.com. This version is built with Gatsby and hosted on Netlify."
  />
)
