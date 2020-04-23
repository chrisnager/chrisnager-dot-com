/** @jsx jsx */

import { FC } from 'react'
import Helmet from 'react-helmet'
import { Box, jsx } from 'theme-ui'

import Intro from '../../components/intro'
import Layout from '../../components/layout'

const NotFound: FC = () => {
  return (
    <Layout>
      <Helmet title="Time for a change / Blog / Chris Nager" />
      <Box sx={{ maxWidth: `55ch`, mb: 5, px: 3 }}>
        <Intro
          title="Time for a change"
          description="I am proud to announce the new ChrisNager.com. This version is built on Gatsby, and hosted on Netlify."
        />
        <p>
          I'm project managing myself and sticking to a plan. Feel free to{` `}
          <a href="https://www.notion.so/chrisnager/ChrisNager-com-a8e63b19f10a4b0580ff029355e28dd8">
            track my progress
          </a>
          .
        </p>
        <p>My goals for this version of the site are making sure it:</p>
        <ul>
          <li>Tells my story</li>
          <li>Is fast</li>
          <li>Is accessible</li>
          <li>Can be used offline</li>
          <li>Includes a full-fledged dark mode</li>
          <li>Is easy to maintain/update</li>
          <li>Is fun to explore</li>
          <li>Displays nicely on mobile</li>
        </ul>
      </Box>
    </Layout>
  )
}

export default NotFound
