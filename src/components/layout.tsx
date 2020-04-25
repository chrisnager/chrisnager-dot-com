/** @jsx jsx */

import { Global } from '@emotion/core'
import { FC } from 'react'
import Helmet from 'react-helmet'
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
          }

          .💯 {
            filter: ${theme.filters.emoji};
          }
      `}
      />
      <Helmet>
        {/* TODO: Add 32 x 32 favicon.ico fallback to root */}

        {/* TODO: Make content hexcode match dynamic background color */}
        <meta name="theme-color" content="#dfeff3" />

        <link rel="icon" href="favicon.svg" />
        <link rel="mask-icon" href="favicon.svg" color="#000000" />

        {/* TODO: Add Apple icon */}
        {/* <link rel="apple-touch-icon" href="apple-touch-icon.png" /> */}
        <link rel="manifest" href="manifest.json" />
      </Helmet>
      <Navigation />
      {children}
      <Footer />
    </Box>
  )
}

export default Layout
