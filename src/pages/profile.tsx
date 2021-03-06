/** @jsx jsx */

import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../components/halo'
import Intro from '../components/intro'
import Layout from '../components/layout'

export interface ProfileProps {
  data: {
    file: {
      childImageSharp: { fluid: any }
    }
  }
}

const Profile: FC<ProfileProps> = ({
  data: {
    file: {
      childImageSharp: { fluid },
    },
  },
}) => {
  return (
    <Layout>
      <Halo title="Profile" url="https://chrisnager.com/profile" />
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro
          title="Profile"
          description="I'm a front end engineer with a background in design, over a decade of work experience, a minimalist aesthetic, and a deep concern for
          performance and accessibility."
        />

        <Img {...{ fluid }} alt="Chris Nager, smiling and wearing a hat" />

        <p sx={{ fontFamily: `Georgia, serif` }}>
          I’ve worked across industries, from Advertising to Finance. I’ve been through a{` `}
          <a
            href="https://www.adweek.com/digital/salesforce-buys-buddy-media-689-million-140913/"
            target="_blank"
            rel="noopener noreferrer"
          >
            near-billion dollar acquisition
          </a>
          , built{` `}
          <a href="https://salesforce.com" target="_blank" rel="noopener noreferrer">
            products millions have used
          </a>
          , helped{` `}
          <a
            href="https://www.nytimes.com/2016/06/18/business/dealbook/iex-group-gains-approval-for-stock-exchange.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            launch America’s newest stock exchange
          </a>
          , was a founding member of a{` `}
          <a href="https://air.inc" target="_blank" rel="noopener noreferrer">
            SaaS startup
          </a>
          , and am now building CartaX at{' '}
          <a href="https://carta.com/" target="_blank" rel="noopener noreferrer">
            Carta
          </a>
          .
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          Pre-quarantine, you may have seen me on the G train,{` `}
          <a href="https://www.instagram.com/p/BsE0AVMCUnt/" target="_blank" rel="noopener noreferrer">
            speed-solving my Rubik’s cube
          </a>
          .
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          I specialize in user experience (UX) and developer experience (DX). My current passion stack is React, React
          Native, TypeScript, Jest, Testing Library, Theme-UI, and Gatsby. What truly sets my work apart is my deep
          understanding of CSS. I know when and how to use flexbox versus grid layouts, and truly understand the
          cascade. I’m particularly proud of{` `}
          <a href="https://zephyr.air.inc" target="_blank" rel="noopener noreferrer">
            Zephyr
          </a>
          , the design system I created for Air. It’s built in TypeScript and includes cross-platform (web/iOS/Android)
          foundations and components.
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          I’ve had opportunities to <Link to="/speaking">speak about my development process</Link>, and hosted meetups
          and internal company teach-ins.
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>
          I learn everyday and have a passion for mentoring. I have experience with project management — writing tech
          specs, managing roadmaps, and delegating tasks. As a team leader, I keep a positive attitude to inspire my
          teammates to give their best efforts.
        </p>

        <p sx={{ fontFamily: `Georgia, serif` }}>I care about purpose-driven work.</p>
      </Box>
    </Layout>
  )
}

export default Profile

export const pageQuery = graphql`
  query ProfileQuery {
    file(relativePath: { eq: "images/hat.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
