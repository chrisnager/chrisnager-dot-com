/** @jsx jsx */

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'

export interface BlogPostSimpleVerticalCenteringWithCssProps {
  data: {
    file: {
      childImageSharp: { fluid: any }
    }
  }
}

const BlogPostSimpleVerticalCenteringWithCss: FC<BlogPostSimpleVerticalCenteringWithCssProps> = ({
  data: {
    file: {
      childImageSharp: { fluid },
    },
  },
}) => {
  return (
    <Layout>
      <Halo
        title="Simple vertical centering with CSS / Blog"
        description="I had an epiphany yesterday."
        hasCodePenEmbed
      />

      <Box as="article" sx={{ maxWidth: `55ch`, mb: 5, px: 3 }}>
        <Intro title="Simple vertical centering with CSS" description="I had an epiphany yesterday." />

        <p
          className="codepen"
          data-height="338"
          data-theme-id="dark"
          data-default-tab="css,result"
          data-user="chrisnager"
          data-slug-hash="xFaJl"
          style={{
            height: 338,
            boxSizing: `border-box`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            border: `2px solid`,
            margin: `1em 0`,
            padding: `1em`,
          }}
          data-pen-title="Simple vertical centering with CSS"
        >
          <span>
            See the Pen <a href="https://codepen.io/chrisnager/pen/xFaJl">Simple vertical centering with CSS</a> by
            Chris Nager (<a href="https://codepen.io/chrisnager">@chrisnager</a>) on{` `}
            <a href="https://codepen.io">CodePen</a>.
          </span>
        </p>

        <p>
          An inline element, when set to <code>vertical-align: middle</code>, nested inside a block-level element causes
          the content in the block level element to center perfectly.
        </p>

        <p>
          Take, for example, an image with text next to it. To vertically center that text relative to the image's
          height, you would need to add <code>vertical-align: middle</code> to the <code>img</code>.
        </p>

        <p>
          <Img
            {...{ fluid }}
            alt="Logo for ChrisNager.com"
            style={{ width: 80, marginBottom: 0, display: `inline-block`, verticalAlign: `middle` }}
          />
          {` `}
          This is my logo
        </p>

        <p>
          This happens because <code>img</code> is an inline element. Pseudo elements also render as inline elements.
          Aha! So, if you were not planning on using an image next to the text, you don't need an unsemantic, empty
          inline element. Just use an <code>::after</code> pseudo element.
        </p>

        <pre>
          <code>&lt;div class="vertically-centered">…&lt;/div></code>
          <br />
          <br />
          <code>
            .vertically-centered &#123;
            <br />
            {`  height: 256px;`}
            <br />}
          </code>
          <br />
          <code>
            .vertically-centered:after &#123;
            <br />
            {`  content: "";`}
            <br />
            {`  height: 100%;`}
            <br />
            {`  display: inline-block;`}
            <br />
            {`  vertical-align: middle;`}
            <br />}
          </code>
        </pre>

        <p>Simple, semantic, and IE8+ compatible.</p>

        <hr sx={{ my: 5, border: 0, height: 1, bg: `divider` }} />

        <p>
          After figuring all this out, I later found that I was not the first to think of this, but in fact similar
          {` `}
          <a href="http://css-tricks.com/centering-in-the-unknown" target="_blank" rel="noopener noreferrer">
            solutions
          </a>
          {` `}
          had been documented years ago. But hey, I'm proud to arrive at this on my own and glad to share it with the
          web design/dev community.
        </p>
      </Box>
    </Layout>
  )
}

export default BlogPostSimpleVerticalCenteringWithCss

export const pageQuery = graphql`
  query BlogPostSimpleVerticalCenteringWithCssQuery {
    file(relativePath: { eq: "images/logo.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
