/** @jsx jsx */

import { jsx, Flex } from 'theme-ui'
import { Link } from 'gatsby'
import Logo from './logo'

const sx = {
  px: 3,
  display: `block`,
}

const links = [
  { to: `/`, children: `Home` },
  { to: `/about`, children: `Profile` },
  { to: `/projects`, children: `Work` },
  { to: `/blog`, children: `Blog` },
]

export default () => (
  <nav role="navigation">
    <Flex>
      <Flex
        sx={{
          width: `5rem`,
          height: `7rem`,
          pl: 2,
          pr: 3,
          justifyContent: `center`,
          alignItems: `center`,
        }}
      >
        <Link
          sx={{
            width: `2.5rem`,
            height: `2.5rem`,
            ':hover > svg > path, :focus > svg > path': {
              stroke: `var(--action)`,
            },
          }}
          to="/"
        >
          <Logo />
        </Link>
      </Flex>
      <Flex
        as="ul"
        sx={{
          my: 0,
          pl: 0,
          flex: 1,
          justifyContent: `flex-end`,
          listStyleType: `none`,
        }}
      >
        {links.map(({ to, children }) => (
          <Flex as="li" sx={{ alignItems: `center` }} key={to}>
            <Link {...{ sx, to, children }}></Link>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </nav>
)
