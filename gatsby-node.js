// import type { GatsbyNode } from 'gatsby'
// import { mkdirSync, writeFileSync } from 'fs'
// import path from 'path'

const { mkdirSync, writeFileSync } = require('fs')
const path = require('path')

// interface FeedItem {
//   title: string
//   link: string
//   description?: string
//   date?: string
// }

function buildFeeds(
  prefix,//: string,
  items,//: FeedItem[],
  meta,//: { title: string; description: string; siteUrl: string },
  reporter,//: any,
) {
  const feedItems = items
    .map((item) => {
      const pubDate = item.date ? `<pubDate>${new Date(item.date).toUTCString()}</pubDate>` : ''
      const desc = item.description ? `<description><![CDATA[${item.description}]]></description>` : ''
      return `    <item>\n      <title><![CDATA[${item.title}]]></title>\n      <link>${item.link}</link>\n      ${pubDate}\n      ${desc}\n    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${meta.title}</title>\n    <link>${meta.siteUrl}/${prefix}</link>\n    <description>${meta.description}</description>\n${feedItems}\n </channel>\n</rss>`

  const json = {
    version: 'https://jsonfeed.org/version/1',
    title: meta.title,
    home_page_url: `${meta.siteUrl}${prefix ? `/` : ``}${prefix}`,
    feed_url: `${meta.siteUrl}${prefix ? `/` : ``}${prefix}/feed.json`,
    items: items.map((item) => ({
      id: item.link,
      url: item.link,
      title: item.title,
      content_text: item.description,
      date_published: item.date,
    })),
  }

  const dir = path.join('public', prefix)
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, 'feed.xml'), xml)
  writeFileSync(path.join(dir, 'feed.json'), JSON.stringify(json, null, 2))
  reporter.info(`feed created at ${prefix || '/'}feed.{xml,json}`)
}

const onPostBuild/*: GatsbyNode['onPostBuild']*/ = async ({ graphql, reporter }) => {
  const result = await graphql/*<{
    site: { siteMetadata: { title: string; description: string; siteUrl: string } }
    posts: { nodes: { title: string; url: string; date: string }[] }
    projects: { nodes: { name: string; url: string; summary: string }[] }
    speaking: { nodes: { name: string; url: string; summary: string; date: string }[] }
  }>*/(`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
      posts: allPostsYaml(sort: { date: DESC }) {
        nodes {
          title
          url
          date
        }
      }
      projects: allProjectsYaml {
        nodes {
          name
          url
          summary
        }
      }
      speaking: allSpeakingYaml {
        nodes {
          name
          url
          summary
          date
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    reporter.panic('Error generating feed', result.errors)
    return
  }

  const { site, posts, projects, speaking } = result.data
  const makeLink = (url/*: string*/) => (url.startsWith('http') ? url : `${site.siteMetadata.siteUrl}${url}`)

  const blogItems/*: FeedItem[]*/ = posts.nodes.map((node) => ({
    title: node.title,
    link: makeLink(node.url),
    date: node.date,
  }))

  const projectItems/*: FeedItem[]*/ = projects.nodes.map((node) => ({
    title: node.name,
    link: makeLink(node.url),
    description: node.summary,
  }))

  const speakingItems/*: FeedItem[]*/ = speaking.nodes.map((node) => ({
    title: node.name,
    link: node.url ? makeLink(node.url) : site.siteMetadata.siteUrl,
    description: node.summary,
    date: node.date,
  }))

  const allItems = [...blogItems, ...projectItems, ...speakingItems].sort((a, b) => {
    const aDate = a.date ? Date.parse(a.date) : 0
    const bDate = b.date ? Date.parse(b.date) : 0
    return bDate - aDate
  })

  buildFeeds('', allItems, site.siteMetadata, reporter)
  buildFeeds('blog', blogItems, site.siteMetadata, reporter)
  buildFeeds('projects', projectItems, site.siteMetadata, reporter)
  buildFeeds('speaking', speakingItems, site.siteMetadata, reporter)
}


module.exports = { onPostBuild }
