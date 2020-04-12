import React from 'react'
import { Link } from 'gatsby'
// import Img from 'gatsby-image'
import { Text } from 'theme-ui'

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
            color: `var(--tag)`,
            textDecoration: `none`,
            display: `inline-block`,
            py: `.33333rem`,
            px: `0.5rem`,
            lineHeight: `1`,
            borderWidth: `1px`,
            borderStyle: `solid`,
            borderColor: `var(--tag)`,
            mr: `0.5em`,
          }}
        >
          {tag}
        </Text>
      ))}
  </div>
)
