export default async function handler() {
  return new Response(
    JSON.stringify(
      {
        ok: true,
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
