import { Link } from 'gatsby'
import React from 'react'
import { Text } from 'theme-ui'

// import Img from 'gatsby-image'

export default ({ article }) => (
  <div>
    {/* <Img alt="" fluid={article.heroImage.fluid} /> */}
    <small>{article.publishDate}</small>
    <h3>
      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
    </h3>
    <div
      dangerouslySetInnerHTML={{
        __html: article.description.childMarkdownRemark.html,
      }}
    />
    {article.tags &&
      article.tags.map(tag => (
        <Text
          as="p"
          key={tag}
          sx={{
            mr: `0.5em`,
            py: `.33333rem`,
            px: `0.5rem`,
            borderWidth: `1px`,
            borderStyle: `solid`,
            borderColor: `tag`,
            display: `inline-block`,
            fontStyle: `italic`,
            lineHeight: `1`,
            textDecoration: `none`,
          }}
        >
          {tag}
        </Text>
      ))}
  </div>
)
