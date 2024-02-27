/** @jsx jsx */

import { Box, jsx } from 'theme-ui'
import { useState } from 'react'

import Halo from '../components/halo'
import Intro from '../components/intro'
import Layout from '../components/layout'

export default function AsciiIndex() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState(``)
  const [topic, setTopic] = useState(``)
  const [rows, setRows] = useState(1)

  const suggestions = [`cat`, `hotdog`, `Totoro`]

  function handleAppSuggestionClick(event) {
    setTopic(event.target.innerText)
  }

  function handleInputChange(event) {
    setTopic(event.target.value)
  }

  function handleRowsChange(event) {
    setRows(event.target.value)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const errorMessage = `There was an error processing your ASCII art.\nPlease try again.`

    setIsProcessing(true)
    setResponse(`Processing…`)

    if (!topic) {
      await setTopic(`nothing`)
    }

    const notificationsSource = new EventSource(`/.netlify/functions/ascii?topic=${topic}&rows=${rows}`)
    
    notificationsSource.onmessage = function(event) {
      let notification

      if (event.data === `[DONE]`) {
        notificationsSource.close()

        return null
      } else {
        notification = JSON.parse(event.data)
      }

      if (notification?.choices?.length) {
	const { content } = notification.choices[0].delta

        setResponse((response) => {
          if (response !== `Processing…` && content) {
            return `${response ?? ``}${content}`
          }
        })
      } else {
        setResponse(errorMessage)
      }
    }
    
    notificationsSource.onerror = function(error) {
        console.error(`Error with notifications EventSource:`, error)
        notificationsSource.close()
    }

    setIsProcessing(false)
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro
          title={
            <span>
              <span sx={{ color: `action` }}>A</span>SCI<span sx={{ color: `action` }}>I</span>
            </span>
          }
          description="Make ASCII art with AI."
        />

        <form onSubmit={handleFormSubmit} sx={{ mt: `2.5rem` }}>
          <label htmlFor="prompt" style={{ display: `block`, fontWeight: 500 }}>
            Type a subject for your ASCII art.
          </label>

          <div
            style={{
              alignItems: `baseline`,
              display: `flex`,
              flexWrap: `wrap`,
              fontSize: `0.9em`,
              gap: `0.25rem`,
              marginBlockStart: `0.25rem`,
            }}
          >
            <span>
              <i>Try</i>:
            </span>
            {suggestions.map((suggestion) => (
              <button
                data-suggestion
                disabled={isProcessing}
                key={suggestion}
                onClick={handleAppSuggestionClick}
                sx={{
                  color: `inherit`,
                  cursor: `pointer`,
                  border: `1px solid`,
                  borderColor: `action`,
                  borderRadius: `5rem`,
                  fontFamily: `inherit`,
                  fontSize: `inherit`,
                  height: `1.5rem`,
                  paddingBlock: 0,
                  paddingInline: `0.5rem`,
                  bg: `transparent`,
                }}
                type="button"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <input
            autoCapitalize="off"
            autoFocus
            value={topic}
            id="prompt"
            name="prompt"
            onChange={handleInputChange}
            sx={{
              boxSizing: `border-box`,
              fontSize: `inherit`,
              marginBlockStart: `0.5rem`,
              paddingBlock: `0.25rem`,
              paddingInline: `0.5rem`,
              width: `100%`,
            }}
            type="text"
          />

          <label htmlFor="prompt" sx={{ display: `block`, fontWeight: 500, mt: 3 }}>
            Choose the maximum number of lines of text to use.
          </label>

          <div>
            <input
              onChange={handleRowsChange}
              sx={{ boxSizing: `border-box`, fontSize: `inherit`, width: `60%` }}
              type="range"
              min={1}
              max={10}
              value={rows}
            />
            <span sx={{ ml: 2 }}>{rows}</span>
          </div>

          <button
            disabled={isProcessing}
            sx={{
              bg: `action`,
              border: `none`,
              borderRadius: `5rem`,
              color: `background`,
              cursor: `pointer`,
              fontFamily: `inherit`,
              fontSize: `inherit`,
              fontWeight: 500,
              height: `2rem`,
              marginBlockStart: `0.5rem`,
              marginInlineStart: `-1px`,
              paddingBlock: 0,
              paddingInline: `1rem`,
            }}
            type="submit"
          >
            Create ASCII art
          </button>
        </form>

        <div style={{ marginBlockStart: `2rem` }}>
          <label htmlFor="response" style={{ display: `block` }}>
            See your ASCII art below.
          </label>

          <textarea
            defaultValue={response}
            disabled={!response}
            id="response"
            name="response"
            style={{
              boxSizing: `border-box`,
              fontFamily: `monospace`,
              fontSize: `inherit`,
              marginBlockStart: `0.25rem`,
              paddingBlock: `0.25rem`,
              paddingInline: `0.5rem`,
              resize: `none`,
              width: `100%`,
            }}
            {...{ rows }}
          />

          <p style={{ marginBlock: 0 }}>
            Powered by{` `}
            <a href="https://platform.openai.com/docs/models/gpt-4" rel="noopener noreferrer" target="_blank">
              <code
                style={{
                  display: `inline-block`,
                  fontSize: `1.15em`,
                  paddingInline: `0.125rem`,
                  textDecoration: `inherit`,
                }}
              >
                GPT-4
              </code>
            </a>
          </p>

          <p style={{ marginBlockEnd: 0 }}>
            <i>Takeaway</i>: GPT-4 is <em>not</em> good at creating ASCII art. This was still fun to build. :D
          </p>
        </div>
      </Box>
    </Layout>
  )
}

export const Head = () => <Halo title="ASCII / Projects" url="https://chrisnager.com/ascii" />

