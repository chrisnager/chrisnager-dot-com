/** @jsx jsx */

import './index.css'

import { jsx, Box } from 'theme-ui'
import Helmet from 'react-helmet'
import Navigation from './navigation'
import Social from './social'

const Layout = ({ children }) => {
  return (
    <Box sx={{ maxWidth: `75ch`, mx: `auto` }}>
      <Helmet>
        <link rel="icon" media="(prefers-color-scheme:dark)" href="favicon-dark.ico" type="image/x-icon" />
        <link rel="icon" media="(prefers-color-scheme:light)" href="favicon.ico" type="image/x-icon" />
        <script
          src="https://unpkg.com/favicon-switcher@1.2.2/dist/index.js"
          crossorigin="anonymous"
          type="application/javascript"
        ></script>
      </Helmet>
      <Navigation />
      {children}
      <Social />
    </Box>
  )
}

export default Layout
