/** @jsx jsx */

import { Global } from '@emotion/core'
import Helmet from 'react-helmet'
import { Box, jsx } from 'theme-ui'

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
      {/*
      // @ts-ignore */}
      <Helmet>
        {/* <meta name="theme-color" content={`background`} />
        <link rel="icon" href="favicon.svg" />
        <link rel="mask-icon" href="mask-icon.svg" color="#000000" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" /> */}
        <link rel="manifest" href="manifest.json" />

        <link rel="icon" media="(prefers-color-scheme:dark)" href="favicon-dark.ico" type="image/x-icon" />
        <link rel="icon" media="(prefers-color-scheme:light)" href="favicon.ico" type="image/x-icon" />

        <script async src="../scripts/favicon-switcher@1.2.2.js"></script>
      </Helmet>
      <Navigation />
      {children}
      <Social />
    </Box>
  )
}

export default Layout
