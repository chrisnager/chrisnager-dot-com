/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'

export interface BlogPostAiImagePromptsProps {}

const items = [
  {
    app: `Midjourney`,
    imageSource: `https://cdn.discordapp.com/attachments/1008571099497377792/1099335178477912114/chrisnager_Dense_repetitive_pattern_of_overlapping_cartoon_food_e8a43624-6536-4d93-9097-0eb81e0d6dd3.png`,
    prompt: `Dense repetitive pattern of overlapping cartoon food with happy faces, includes sushi, pizza, cheeseburger, hotdog, ice cream cone, and broccoli, line art, simple pastel color palette, implied depth`,
  },
  {
    app: `Adobe Firefly`,
    imageSource: `/images/blog/prompts/Firefly_A+curious robot without a mouth, in search of something, alone, dramatic backlighting, 4k, photorealistic._photo_56040.jpg`,
    prompt: `A curious robot without a mouth, in search of something, alone, dramatic backlighting, 4k, photorealistic. [Style: Photo]`,
  },
]

const BlogPostAiImagePrompts: FC<BlogPostAiImagePromptsProps> = () => {
  return (
    <Layout>
      <Halo
        title="AI image prompts / Blog"
        url="https://chrisnager.com/blog/ai-image-prompts"
        description="This is a list of helpful prompts I've used with AI-generated image tools like Midjourney, DALL-E, and Adobe Firefly."
      />

      <Box as="article" sx={{ maxWidth: `55ch`, mb: 5, px: 3 }}>
        <Intro
          date="April 22nd, 2023"
          title="AI image prompts"
          description="This is a list of helpful prompts I've used with AI-generated image tools like Midjourney, DALL-E, and Adobe Firefly."
        />
        <p sx={{ fontFamily: `Georgia, serif` }}>
          I have an interest in AI prompt engineering and AI-generated visuals. I am learning. Check back here to see my
          progress in real time.
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          As some who focuses on accessibility, I like that image prompts serve as accessible <code>alt</code>{' '}
          attributes.
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          These prompts are mostly for myself, but I figured others may benefit from my learnings.
        </p>

        <ul sx={{ fontFamily: `Georgia, serif`, listStyleType: `none`, my: 0, pl: 0 }}>
          {items.map(({ app, imageSource, prompt }) => {
            return (
              <li key={prompt} sx={{ mt: 4 }}>
                <figure sx={{ m: 0 }}>
                  <img alt={prompt} src={imageSource} sx={{ display: `block`, maxWidth: `100%` }} />

                  <figcaption sx={{ mt: 2 }}>
                    {app} prompt:
                    <br />
                    <code>{prompt}</code>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </Box>
    </Layout>
  )
}

export default BlogPostAiImagePrompts
