import React from 'react'
import { Link } from 'gatsby'
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
        <p
          sx={{
            color: `#A0A0A0`,
            textDecoration: `none`,
            display: `inline-block`,
            py: `.33333rem`,
            px: `0.5rem`,
            lineHeight: `1`,
            borderRadius: `2px`,
            border: `1px solid #A0A0A0`,
            mr: `0.5em`,
          }}
          key={tag}
        >
          {tag}
        </p>
      ))}
  </div>
)
