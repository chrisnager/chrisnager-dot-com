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
            text-underline-position: under;
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
        {/* <meta name="theme-color" content={`background`} />
        <link rel="icon" href="favicon.svg" />
        <link rel="mask-icon" href="mask-icon.svg" color="#000000" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" /> */}
        <link rel="manifest" href="manifest.json" />

        <link rel="icon" media="(prefers-color-scheme:dark)" href="favicon-dark.ico" type="image/x-icon" />
        <link rel="icon" media="(prefers-color-scheme:light)" href="favicon.ico" type="image/x-icon" />
      </Helmet>
      <Navigation />
      {children}
      <Footer />
    </Box>
  )
}

export default Layout
