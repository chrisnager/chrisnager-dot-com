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
    imageSource: `chrisnager_a_yellow_room_with_no_windows_everything_in_the_room_7e1f9054-91fd-4860-983d-f678dbdce216.png`,
    prompt: `a yellow room with no windows, everything in the room is yellow, minimalist --ar 32:9 --v 5`,
  },
  {
    app: `Midjourney`,
    imageSource: `chrisnager_hyper-realistic_minecraft_cows_grazing_in_a_field_8k_334cd18e-6b88-4538-a8a6-d88679575eb5.png`,
    prompt: `hyper-realistic minecraft cows grazing in a field, 8k`,
  },
  {
    app: `Midjourney`,
    imageSource: `chrisnager_NYC_midtown_cab_in_the_rain_at_night_in_yellow_and_r_1f782302-344c-4ff7-a4e1-c0451ac44676.webp`,
    prompt: `NYC midtown cab in the rain, at night, in yellow and red watercolor sketch drawing, detailed, view from the street up --ar 9:16 --v 5`,
  },
  {
    app: `Midjourney`,
    imageSource: `chrisnager_Dense_repetitive_pattern_of_overlapping_cartoon_food_e8a43624-6536-4d93-9097-0eb81e0d6dd3.png`,
    prompt: `Dense repetitive pattern of overlapping cartoon food with happy faces, includes sushi, pizza, cheeseburger, hotdog, ice cream cone, and broccoli, line art, simple pastel color palette, implied depth`,
  },
  {
    app: `Adobe Firefly`,
    imageSource: `Firefly_A+curious robot without a mouth, in search of something, alone, dramatic backlighting, 4k, photorealistic._photo_56040.jpg`,
    prompt: `A curious robot without a mouth, in search of something, alone, dramatic backlighting, 4k, photorealistic. [Style: Photo]`,
  },
  {
    app: `DALL-E 2`,
    imageSource: `DALL·E 2023-04-23 13.06.38 - Shark, dark, high quality, 8-bit art.png`,
    prompt: `Shark, dark, high quality, 8-bit art`,
  },
  {
    app: `DALL-E 2`,
    imageSource: `DALL·E 2023-04-23 13.14.29 - A birthday card illustration of a lion and a fox attending a birthday party seated at a table that has a birthday cake on it with a cerulean color bac.png`,
    prompt: `A birthday card illustration of a lion and a fox attending a birthday party seated at a table that has a birthday cake on it with a cerulean color background`,
  },
  {
    app: `DALL-E 2`,
    imageSource: `DALL·E 2023-04-23 13.12.49 - Roy Lichtenstein painting of Captain Kirk fighting the Gorn.png`,
    prompt: `Roy Lichtenstein painting of Captain Kirk fighting the Gorn`,
  },
]

const BlogPostAiImagePrompts: FC<BlogPostAiImagePromptsProps> = () => {
  return (
    <Layout>
      <Halo
        title="AI image prompts / Blog"
        url="https://chrisnager.com/blog/ai-image-prompts"
        description="This is my collection of helpful prompts for AI-generated image tools like Midjourney, DALL-E, and Adobe Firefly."
      />

      <Box as="article" sx={{ maxWidth: `55ch`, mb: 5, px: 3 }}>
        <Intro
          date="April 22nd, 2023"
          title="AI image prompts"
          description="This is my collection of helpful prompts for AI-generated image tools like Midjourney, DALL-E, and Adobe Firefly."
        />
        <p sx={{ fontFamily: `Georgia, serif` }}>
          I have an interest in AI prompt engineering and AI-generated visuals, and want to share my journey. Posting
          these prompts is my way of learning in the open, and I invite you to join me. Check back to see my progress in
          real time.
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          As an accessibility advocate, I like how image prompts serve as accessible <code>alt</code> attributes.
        </p>

        <ul sx={{ fontFamily: `Georgia, serif`, listStyleType: `none`, my: 0, pl: 0 }}>
          {items.map(({ app, imageSource, prompt }) => {
            return (
              <li key={prompt} sx={{ mt: 4 }}>
                <figure sx={{ m: 0 }}>
                  <img
                    alt={prompt}
                    src={`/images/blog/ai-image-prompts/${imageSource}`}
                    sx={{ display: `block`, maxWidth: `100%` }}
                  />

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
