/** @jsx jsx */

import { Link as GatsbyLink } from 'gatsby'
import { jsx } from 'theme-ui'

export default function Link({ children, href }) {
  if (href.startsWith('/')) {
    return <GatsbyLink to={href}>{children}</GatsbyLink>
  }

  const onPage = href.startsWith('#')

  return (
    <a {...{ href }} rel={onPage ? null : 'noopener noreferrer'} target={onPage ? null : '_blank'}>
      {children}
    </a>
  )
}
