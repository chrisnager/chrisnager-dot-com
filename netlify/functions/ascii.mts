export default async ({ url }) => {
  const { env } = Netlify
  const { searchParams } = new URL(url)
  const rows = parseInt(searchParams.get(`rows`)) ?? 1
  const topic = searchParams.get(`topic`) ?? `nothing`
  const openaiUrl = `https://api.openai.com/v1/chat/completions`

  const prompt = `Take the subject a user sends and draw it as detailed ASCII art using a maximum height of ${rows} row${rows === 1 ? `` : `s`} and a maximum width of 40 columns. It's also ok to use emojis.`

  const response = await fetch(openaiUrl, {
    [`body`]: JSON.stringify({
      [`max_tokens`]: `200`,
      [`messages`]: [
        {[`role`]: `system`, [`content`]: prompt},
        {[`role`]: `user`, [`content`]: topic.slice(0, 50)},
      ],
      [`model`]: `gpt-4`,
      [`stream`]: true,
      [`temperature`]: `0.4`,
    }),
    [`headers`]: {
      [`Authorization`]: `Bearer ${env.get(`OPENAI_API_KEY`)}`,
      [`Content-Type`]: `application/json`,
      [`Openai-Organization`]: env.get(`OPENAI_ORGANIZATION`),
    },
    [`method`]: `POST`,
  })

  return new Response(
    response.body,
    {[`headers`]: { [`Content-Type`]: `text/event-stream` }}
  )
}

