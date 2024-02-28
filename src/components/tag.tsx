/** @jsx jsx */

import { useLocation } from '@reach/router'
import { Link } from 'gatsby'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

interface TagProps {
  children: string
}

const Tag: FC<TagProps> = ({ children }) => {
  const location = useLocation()

  const slug = children.toLowerCase().replace(/ /g, `-`).replace(/\(/g, ``).replace(/\)/g, ``)

  return (
    <Box
      as={Link}
      key={children}
      sx={{
        mr: 2,
        py: 1,
        px: 2,
        display: `inline-block`,
        fontStyle: `italic`,
        fontSize: `0.8em`,
        lineHeight: 1,
        color: `text`,
        backgroundColor: `tag`,
      }}
      to={`/${location.pathname.split(`/`)[1]}/${slug}`}
      {...{ children }}
    />
  )
}

export default Tag
