/** @jsx jsx */
import { FC, Fragment, useEffect, useState } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'

const FourSevenEight: FC = () => {
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (isRunning) {
      document.querySelectorAll('progress').forEach((p) => (p.value = 0))
    }
  }, [isRunning])

  function runSingle(id) {
    return new Promise((resolve) => {
      const progress = document.getElementById(id)
      let value = 0

      const interval = setInterval(() => {
        value += 0.01
        progress.value = value

        if (value >= progress.max) {
          clearInterval(interval)
          resolve()
        }
      }, 10)
    })
  }

  async function runAll() {
    setIsRunning(true)
    await runSingle('inhale')
    await runSingle('hold')
    await runSingle('exhale')
    setIsRunning(false)
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: `1000px`, mx: `auto`, px: `1rem`, mb: 5, px: 3, display: `grid`, gap: `2rem` }}>
        <Intro
          title="4-7-8 breathing"
          description={
            <p>
              Enhance your calm. See{' '}
              <a
                href="https://integrativemedicine.arizona.edu/health_hub/awcimagazine/just_breathe_using_breathwork_for_wellbeing.html#:~:text=4%2D7%2D8%20breathing"
                target="_blank"
              >
                4-7-8 breathing
              </a>{' '}
              benefits.
            </p>
          }
        />
        <button
          disabled={isRunning}
          id="begin"
          onClick={runAll}
          sx={{
            fontSize: `inherit`,
            inlineSize: `fit-content`,
            backgroundColor: `action`,
            border: `none`,
            borderRadius: `5rem`,
            padding: `0.5rem 1rem`,
            fontWeight: `bold`,
            color: `background`,
            cursor: `pointer`,
            [`:disabled`]: { opacity: 0.25 },
          }}
        >
          Begin
        </button>

        <div sx={{ display: `grid` }}>
          <label for="inhale" sx={{ marginBlockStart: `0.25rem` }}>
            <strong>Inhale</strong> through your nose for 4 seconds.
          </label>
          <progress id="inhale" max="4" sx={{ inlineSize: `calc(100% / 8 * 4)`, order: `-1` }} value="0">
            4
          </progress>
        </div>

        <div sx={{ display: `grid` }}>
          <label for="hold" sx={{ marginBlockStart: `0.25rem` }}>
            <strong>Hold</strong> for 7 seconds.
          </label>
          <progress id="hold" max="7" sx={{ inlineSize: `calc(100% / 8 * 7)`, order: `-1` }} value="0">
            7
          </progress>
        </div>

        <div sx={{ display: `grid` }}>
          <label for="exhale" sx={{ marginBlockStart: `0.25rem` }}>
            <strong>Exhale</strong> through your mouth for 8 seconds.
          </label>
          <progress id="exhale" max="8" sx={{ inlineSize: `100%`, order: `-1` }} value="0">
            8
          </progress>
        </div>
      </Box>
    </Layout>
  )
}

export default FourSevenEight

export const Head = () => (
  <Halo description="Enhance your calm." title="4-7-8 breathing / Projects" url="https://chrisnager.com/478" />
)
