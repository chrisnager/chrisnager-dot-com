import { createDoomPersistence } from '../../apps/mcp-server/src/domain/createPersistence.js'

export default async function handler() {
  const persistence = createDoomPersistence(process.env)

  return new Response(
    JSON.stringify(
      {
        ok: true,
        persistence: persistence.kind,
        service: 'doom-mcp-server',
      },
      null,
      2,
    ),
    {
      headers: {
        'cache-control': 'no-store',
        'content-type': 'application/json; charset=utf-8',
      },
    },
  )
}

export const config = {
  path: '/doom/api/doom-health',
}
