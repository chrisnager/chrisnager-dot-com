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
      <Halo title="Speaking" url="https://chrisnager.com/speaking" />
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro title="Speaking" description="Fun stuff I've presented" />

        <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: `none` }}>
          {data.allSpeakingYaml.edges.map(
            ({ node }: { node: { summary: string; url: string; date: string; name: string } }) => (
              <Box key={node.name} as="li" sx={{ pt: 4 }}>
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
                      fontSize: 2,
                      color: `text`,
                      'a:hover > &': { color: `text` },
                    }}
                  >
                    {node.date}
                  </Text>

                  <Text as="h2" sx={{ mt: 1, fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                    {node.name}
                  </Text>

                  <Text
                    as="p"
                    sx={{ mt: 1, fontFamily: `Georgia, serif`, color: `text`, 'a:hover > &': { color: `text` } }}
                  >
                    {node.summary}
                  </Text>
                </Box>
              </Box>
            ),
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export default Speaking

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
