/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'
import Layout from '../components/layout'

export default () => {
  return (
    <Layout>
      <Box sx={{ px: 3 }}>
        <Text as="h1" sx={{ fontWeight: 500 }}>
          Profile
        </Text>
        <Text as="p" sx={{ my: 3 }}>
          Stuff about me.
        </Text>

        <p>
          Front end engineer with a background in design, a minimalist aesthetic, and a deep concern for performance and
          accessibility. <a href="/">Learn more</a>
        </p>

        <p>
          I’m a software engineer with a background in design. My design and code come from a deep concern for
          performance and accessibility.
        </p>

        <p>
          I’ve worked in many industries, from Advertising to Finance. I’ve been part of a{` `}
          <a href="https://www.adweek.com/digital/salesforce-buys-buddy-media-689-million-140913/">
            near-billion dollar acquisition
          </a>
          , built <a href="#">products millions have used</a>, helped{` `}
          <a href="https://www.nytimes.com/2016/06/18/business/dealbook/iex-group-gains-approval-for-stock-exchange.html">
            launch America’s newest stock exchange
          </a>
          , and am currently a founding member of a <a href="/">ground-level startup</a>.
        </p>

        <p>You may see me on the G train, speed-solving my Rubik’s cube.</p>

        <p>
          I specialize in UX (User Experience) and DX (Developer Experience). My current passion stack is React, React
          Native, TypeScript. Aside from these buzzword skills, what truly sets my work apart is my (deep) understanding
          of CSS. I know when and how to use grid layouts and truly understanding the cascade. I’m particularly proud of
          Zephyr, the design system I created for Air. It’s built in TypeScript and includes including cross-platform
          foundations and components.
        </p>

        <p>I’ve had opportunities to speak about my process and I host internal company teach-ins when appropriate.</p>

        <p>I learn everyday and have a passion for mentoring. As a team leader,</p>

        <p>I’ve launched web, iOS, and Android apps for companies ranging from small to Coca Cola.</p>

        <p>I am in constant search of purpose-driven work.</p>
      </Box>
    </Layout>
  )
}
