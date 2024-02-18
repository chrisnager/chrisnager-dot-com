/** @jsx jsx */

import { Global } from '@emotion/react'
import { MDXProvider } from '@mdx-js/react'
import { FC, ReactElement } from 'react'
import { Box, jsx } from 'theme-ui'

import Footer from './footer'
import Link from './link'
import Navigation from './navigation'

const Layout: FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
  return (
    <MDXProvider components={{ a: Link }}>
      <Box sx={{ maxWidth: `75ch`, mx: `auto` }}>
        <Global
          styles={(theme: {
            colors: { action: string; selection: string }
            fonts: { body: string }
            fontWeights: { heading: string }
            lineHeights: { body: string; heading: string }
          }) => `
            ::selection {
              background-color: ${theme.colors.selection};
            }

            :focus {
              outline: 6px double ${theme.colors.action};
              outline-offset: 0.125em;
            }

            body {
              background-color: inherit;
              font: 1.075em/${theme.lineHeights.body} ${theme.fonts.body};
            }

            @media (min-width: 640px) {
              body {
                font-size: 1.25em;
              }
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

            @keyframes draw {
              from { stroke-dasharray: 425; stroke-dashoffset: 425; }
              to { stroke-dasharray: 450; stroke-dashoffset: 0; }
            }

            @keyframes draw-2 {
              from, 12.5% { stroke-dasharray: 425; stroke-dashoffset: 425; }
              to { stroke-dasharray: 450; stroke-dashoffset: 0; }
            }
        `}
        />

        <Navigation />
        <main>{children}</main>
        <Footer />
      </Box>
    </MDXProvider>
  )
}

export default Layout
