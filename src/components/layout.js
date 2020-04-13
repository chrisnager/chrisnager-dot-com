/** @jsx jsx */

import { jsx, Box } from 'theme-ui'
import { Global } from '@emotion/core'
import Helmet from 'react-helmet'
import Navigation from './navigation'
import Social from './social'

const Layout = ({ children }) => {
  return (
    <Box sx={{ maxWidth: `75ch`, mx: `auto` }}>
      <Global
        styles={theme => `
          @media (prefers-reduced-motion: reduce) {
            * {
              animation: none !important;
            }
          }
          
          :focus {
            outline: 6px double ${theme.colors.action};
            outline-offset: 0.125em;
          }
          
          body {
            margin: 0;
            font-size: 1.25em;
            line-height: 1.7;
            font-family: system-ui, sans-serif;
          }
          
          img {
            width: 100%;
            display: block;
          }
          
          a {
            color: ${theme.colors.action};
            text-decoration: none;
          }
          
          a:hover {
            text-decoration: underline;
          }
          
          h1,
          h2,
          h3 {
            font-weight: 500;
          }
          
          h1 {
            line-height: 1.4;
          }      
      `}
      />

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
