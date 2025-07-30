/** @jsx jsx */
import { graphql } from 'gatsby'
import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Halo from '../components/halo'
import Intro from '../components/intro'
import Layout from '../components/layout'

export interface SpeakingProps {
  data: any
}

const Speaking: FC<SpeakingProps> = ({ data }) => {
  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, marginBlockEnd: 5, paddingInline: 3 }}>
        <Intro title="Speaking" description="Fun stuff I've presented" />

        <Box as="ul" sx={{ marginBlock: 0, paddingInlineStart: 0, listStyleType: `none` }}>
          {data.allSpeakingYaml.edges.map(
            ({ node }: { node: { summary: string; url: string; date: string; name: string } }) => {
              const currentYear = `${new Date().getFullYear()}`
              const formattedDate = node.date.includes(currentYear) ? node.date.slice(0, -6) : node.date

              return (
                <Box key={node.name} as="li" sx={{ paddingBlockStart: 4 }}>
                  <Box
                    as={node.url ? `a` : `div`}
                    // @ts-ignore
                    href={!!node.url ? node.url : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ display: `block`, ':hover': { textDecoration: `none` } }}
                  >
                    <Text
                      as="p"
                      sx={{
                        fontSize: `0.8em`,
                        color: `text`,
                        'a:hover > &': { color: `text` },
                      }}
                    >
                      {formattedDate}
                    </Text>

                    <Text
                      as="h2"
                      sx={{ marginBlockStart: 1, fontSize: `1.2em`, 'a:hover > &': { textDecoration: `underline` } }}
                    >
                      {node.name}
                    </Text>

                    <Text
                      as="p"
                      sx={{
                        marginBlockStart: 1,
                        fontFamily: `Georgia, serif`,
                        color: `text`,
                        'a:hover > &': { color: `text` },
                      }}
                    >
                      {node.summary}
                    </Text>
                  </Box>
                </Box>
              )
            },
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export default Speaking

export const Head = () => (
  <Halo
    title="Speaking"
    url="https://chrisnager.com/speaking"
    feedLinks={[
      { href: `/speaking/feed.xml`, type: `application/rss+xml`, title: `Speaking RSS feed / Chris Nager` },
      { href: `/speaking/feed.json`, type: `application/json`, title: `Speaking JSON feed / Chris Nager` },
    ]}
  />
)

export const pageQuery = graphql`
  query SpeakingQuery {
    allSpeakingYaml {
      edges {
        node {
          url
          name
          summary
          date
        }
      }
    }
  }
`
