/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'

const BlogPostVideoAndAudioInCss: FC = () => {
  return (
    <Layout>
      <Halo
        title="Video and audio in CSS / Blog"
        url="https://chrisnager.com/blog/simple-vertical-centering-with-css"
        description="Video, audio, and images are all types of multimedia."
        hasCodePenEmbed
      />

      <Box as="article" sx={{ maxWidth: `55ch`, mb: 5, px: 3 }}>
        <Intro
          date="December 4th, 2012"
          title="Video and audio in CSS"
          description="Video, audio, and images are all types of multimedia."
        />

        <p>
          Currently only images are allowed in our CSS. In many cases video and audio require controls and are a core
          part of the page content. Sometimes, though, they are strictly used as background decoration and do not
          require controls.
        </p>

        <p>
          Let's say you want an infinitely-looping full screen video as your homepage background (like this one:{' '}
          <a href="http://marisapassos.com" target="_blank" rel="noopener noreferrer">
            marisapassos.com
          </a>
          ). Your only option is to include it in your HTML. That works, but if the video is essentially decoration or
          serves as a supporting style for the real content (in the HTML), then I say it belongs in the presentational
          layer (the CSS).
        </p>

        <p>
          Take this site as another example:{' '}
          <a href="http://www.thecassette.fr" target="_blank" rel="noopener noreferrer">
            thecassette.fr
          </a>
          . Their video of the dancing shoes is clearly used for decoration. It sits in the background and loops
          creating a nice effect, making the page much more visually pleasing and adding to their branding.
        </p>

        <p>
          Their video doesn't belong in the meat of the page as it is not content, but truly belongs in the CSS with all
          the other styling. The developers of this site even used a clever fallback image of the shoes for the browsers
          that didn't support their video (which happens to be an .swf file in this case, but could be any type of web
          video format).
        </p>

        <Text as="p" sx={{ borderRadius: 3, p: 3, bg: `tag` }}>
          <strong>Experimental code ahead.</strong> The following code doesn't exist…yet.
        </Text>

        <p>I would rewrite their background video in CSS something like this:</p>

        <pre
          sx={{
            borderRadius: 3,
            p: 3,
            overflowX: `auto`,
            bg: `tag`,
          }}
        >
          <code>
            {`.page {
    background: url(images/dots-grid.png),
                url(video/dancing-shoes.webm),

                /* Video fallback */
                url(video/dancing-shoes.mp4),

                /* Image fallback */
                url(images/dancing-shoes.jpg);
    background-size: cover;
    background-play-state: running;
    background-iteration-count: infinite;
}`}
          </code>
        </pre>

        <p>
          On this site (
          <a href="http://www.aboutblank.cz/" target="_blank" rel="noopener noreferrer">
            aboutblank.cz
          </a>
          ), again, video is used to paint the page, but is not true content, and therefore does not belong in the HTML,
          but rather the CSS. When I disable all CSS styles on the page, I still see the video looping.
        </p>

        <hr />

        <p>
          As for audio, I feel the same way, that if the audio is not content (like album tracks on a band's site) and
          belongs in the background, we should be able to send it to the CSS.
        </p>

        <p>
          Chris Coyier wrote an interesting article in 2011 describing how to{' '}
          <a href="http://css-tricks.com/play-sound-on-hover/" target="_blank" rel="noopener noreferrer">
            play sound on <code>:hover</code>
          </a>
          . This method works, but wouldn't it be nice to be able to make this work purely with CSS without HTML or JS?
        </p>

        <p>I think this would be quite awesome:</p>

        <pre
          sx={{
            borderRadius: 3,
            p: 3,
            overflowX: `auto`,
            bg: `tag`,
          }}
        >
          <code>
            {`.btn:hover {
    background-audio: src(audio/bloop.webm),

                      /* Audio fallback */
                      src(audio/bloop.mp3);
}
btn:active {
    background-audio: src(audio/tick.webm),

                      /* Audio fallback */
                      src(audio/tick.mp3);
}`}
          </code>
        </pre>

        <p>
          Presentational elements belong in the CSS. If audio or video, like images and colors, are used as
          presentational elements, then they should be put in the CSS.
        </p>
      </Box>
    </Layout>
  )
}

export default BlogPostVideoAndAudioInCss
