/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

const Logo: FC = () => {
  return (
    <Box
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      sx={{ inlineSize: '2.5rem', blockSize: '2.5rem', display: `block` }}
    >
      <title>"C" logo of Chris Nager (Press to go home)</title>
      <Box
        as="path"
        d="M21,100A78.06,78.06,0,0,1,52.25,37.48h0v125h0a78.17,78.17,0,0,0,118.52-31.26l-43-18.76.15-.33a31.26,31.26,0,0,1-44.43,14.9"
        sx={{
          fill: 'none',
          strokeLinejoin: 'round',
          strokeWidth: '10px',
          stroke: `text`,
          animation: `2s draw linear forwards`,

          'a:hover > svg > &, :focus > svg > &': {
            stroke: `action`,
          },
        }}
      />
      <Box
        as="path"
        d="M82,176.18,82,23.42a95.41,95.41,0,0,1,17.19-1.56,78.16,78.16,0,0,1,72,47.72l-43.2,18.25h0A31.26,31.26,0,0,0,81.67,74.08"
        sx={{
          fill: 'none',
          strokeLinejoin: 'round',
          strokeWidth: '10px',
          stroke: `text`,
          animation: `draw-2 2.4s linear forwards`,

          'a:hover > svg > &, :focus > svg > &': {
            stroke: `action`,
          },
        }}
      />
    </Box>
  )
}

export default Logo
