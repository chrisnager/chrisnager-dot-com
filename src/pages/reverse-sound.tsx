/** @jsx jsx */

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../components/halo'
import Intro from '../components/intro'
import Layout from '../components/layout'

function audioBufferToWav(audioBuffer: AudioBuffer) {
  const numChannels = audioBuffer.numberOfChannels
  const sampleRate = audioBuffer.sampleRate
  const numSamples = audioBuffer.length
  const bitsPerSample = 16
  const bytesPerSample = bitsPerSample / 8
  const blockAlign = numChannels * bytesPerSample
  const buffer = new ArrayBuffer(44 + numSamples * blockAlign)
  const view = new DataView(buffer)

  function writeString(offset: number, string: string) {
    for (let index = 0; index < string.length; index += 1) {
      view.setUint8(offset + index, string.charCodeAt(index))
    }
  }

  function writeHeaders() {
    writeString(0, 'RIFF')
    view.setUint32(4, 36 + numSamples * blockAlign, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, numChannels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * blockAlign, true)
    view.setUint16(32, blockAlign, true)
    view.setUint16(34, bitsPerSample, true)
    writeString(36, 'data')
    view.setUint32(40, numSamples * blockAlign, true)
  }

  function writeInterleavedData() {
    const channels = Array.from({ length: numChannels }, (_, index) => audioBuffer.getChannelData(index))
    let offset = 44

    for (let sampleIndex = 0; sampleIndex < numSamples; sampleIndex += 1) {
      for (let channelIndex = 0; channelIndex < numChannels; channelIndex += 1) {
        const sample = Math.max(-1, Math.min(1, channels[channelIndex][sampleIndex]))

        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true)
        offset += 2
      }
    }
  }

  writeHeaders()
  writeInterleavedData()

  return buffer
}

export default function ReverseSound() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState(``)
  const [reversedUrl, setReversedUrl] = useState(``)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState(``)

  useEffect(() => {
    return () => {
      if (originalUrl) {
        URL.revokeObjectURL(originalUrl)
      }

      if (reversedUrl) {
        URL.revokeObjectURL(reversedUrl)
      }
    }
  }, [originalUrl, reversedUrl])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    setErrorMessage(``)

    if (!file) {
      setAudioFile(null)

      if (originalUrl) {
        URL.revokeObjectURL(originalUrl)
      }

      setOriginalUrl(``)
      return
    }

    setAudioFile(file)

    if (originalUrl) {
      URL.revokeObjectURL(originalUrl)
    }

    if (reversedUrl) {
      URL.revokeObjectURL(reversedUrl)
      setReversedUrl(``)
    }

    setOriginalUrl(URL.createObjectURL(file))
  }

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage(``)
    setReversedUrl(``)

    if (!audioFile) {
      setErrorMessage(`Please choose an audio file to reverse.`)
      return
    }

    if (typeof AudioContext === `undefined`) {
      setErrorMessage(`Your browser does not support the Web Audio API.`)
      return
    }

    try {
      setIsProcessing(true)

      const arrayBuffer = await audioFile.arrayBuffer()
      const audioContext = new AudioContext()
      const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer)
      const reversedBuffer = audioContext.createBuffer(
        decodedBuffer.numberOfChannels,
        decodedBuffer.length,
        decodedBuffer.sampleRate,
      )

      for (let channelIndex = 0; channelIndex < decodedBuffer.numberOfChannels; channelIndex += 1) {
        const channelData = decodedBuffer.getChannelData(channelIndex)
        const reversedChannelData = reversedBuffer.getChannelData(channelIndex)

        for (let sampleIndex = 0, lastIndex = channelData.length - 1; sampleIndex < channelData.length; sampleIndex += 1) {
          reversedChannelData[sampleIndex] = channelData[lastIndex - sampleIndex]
        }
      }

      const wavArrayBuffer = audioBufferToWav(reversedBuffer)
      const blob = new Blob([wavArrayBuffer], { type: `audio/wav` })
      const reversedObjectUrl = URL.createObjectURL(blob)

      setReversedUrl(reversedObjectUrl)
    } catch (error) {
      console.error(error)
      setErrorMessage(`There was a problem reversing your audio. Please try another file.`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, marginBlockEnd: 5, paddingInline: 3 }}>
        <Intro title="Reverse a sound" description="Upload an audio file to hear it backwards." />

        <Box
          as="form"
          onSubmit={handleFormSubmit}
          sx={{
            bg: `muted`,
            borderRadius: `0.75rem`,
            padding: [3, 4],
            display: `flex`,
            flexDirection: `column`,
            gap: 3,
          }}
        >
          <label htmlFor="sound-input" sx={{ fontWeight: 600 }}>
            Choose a file
          </label>
          <input
            accept="audio/*"
            id="sound-input"
            name="sound"
            onChange={handleFileChange}
            type="file"
            sx={{ fontSize: `inherit` }}
          />

          <button
            disabled={isProcessing || !audioFile}
            type="submit"
            sx={{
              alignSelf: `flex-start`,
              bg: isProcessing ? `text` : `action`,
              border: `none`,
              borderRadius: `999px`,
              color: `background`,
              cursor: isProcessing ? `wait` : `pointer`,
              fontFamily: `inherit`,
              fontSize: `inherit`,
              fontWeight: 600,
              paddingBlock: `0.5rem`,
              paddingInline: `1.25rem`,
              textDecoration: isProcessing ? `line-through` : `none`,
            }}
          >
            {isProcessing ? `Reversing...` : `Reverse sound`}
          </button>

          {errorMessage && (
            <Box
              sx={{
                bg: `rgba(255, 0, 0, 0.1)`,
                borderRadius: `0.5rem`,
                border: `1px solid`,
                borderColor: `action`,
                color: `text`,
                padding: 2,
              }}
            >
              {errorMessage}
            </Box>
          )}
        </Box>

        <Box sx={{ display: `grid`, gap: 3, marginBlockStart: 4 }}>
          <div>
            <p style={{ marginBlockEnd: `0.5rem`, fontWeight: 600 }}>Original</p>
            <audio controls src={originalUrl} style={{ inlineSize: `100%` }}>
              Your browser does not support the audio element.
            </audio>
          </div>

          <div>
            <p style={{ marginBlockEnd: `0.5rem`, fontWeight: 600 }}>Reversed</p>
            {reversedUrl ? (
              <audio controls src={reversedUrl} style={{ inlineSize: `100%` }}>
                Your browser does not support the audio element.
              </audio>
            ) : (
              <Box
                sx={{
                  border: `1px dashed`,
                  borderColor: `action`,
                  borderRadius: `0.5rem`,
                  color: `text`,
                  padding: 3,
                }}
              >
                Your reversed sound will appear here.
              </Box>
            )}
          </div>

          {reversedUrl && (
            <a
              download="reversed.wav"
              href={reversedUrl}
              sx={{
                alignSelf: `flex-start`,
                color: `text`,
                display: `inline-flex`,
                gap: `0.5rem`,
                alignItems: `center`,
                border: `1px solid`,
                borderColor: `action`,
                borderRadius: `999px`,
                paddingBlock: `0.35rem`,
                paddingInline: `0.75rem`,
              }}
            >
              <span aria-hidden="true" role="img">
                ⬇️
              </span>
              Download reversed WAV
            </a>
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export const Head = () => <Halo title="Reverse Sound / Projects" url="https://chrisnager.com/reverse-sound" />
