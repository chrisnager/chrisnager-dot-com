/** @jsx jsx */

import { Global } from '@emotion/core'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Footer from './footer'
import Navigation from './navigation'

const Layout: FC = ({ children }) => {
  return (
    <Box sx={{ maxWidth: `75ch`, mx: `auto` }}>
      <Global
        styles={theme => `
          ::selection {
            background-color: ${theme.colors.selection};
          }
          
          :focus {
            outline: 6px double ${theme.colors.action};
            outline-offset: 0.125em;
          }
          
          body {
            font: 1.25em/${theme.lineHeights.body} ${theme.fonts.body};
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
          h2 {
            font-weight: ${theme.fontWeights.heading};
            line-height: ${theme.lineHeights.heading};
            letter-spacing: -0.00625em;
          }
      `}
      />

      <Navigation />
      <main>{children}</main>
      <Footer />
    </Box>
  )
}

export default Layout
