const nacl = require('tweetnacl')


addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  const pubKey = searchParams.get('public_key')

  let interaction = { type: 0 }
  let body = null
  try {
    body = await request.text()
    interaction = JSON.parse(body)
  } catch {}

  if (body !== null ) {
  const securityResponse = await checkSecurityHeaders(pubKey, request, body)
  if (securityResponse && securityResponse instanceof Response)
    return securityResponse
  }

  if (interaction.type === 1) {
    return new Response(JSON.stringify({ type: 1 }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } else {
    let url = searchParams.get('url')
    response = await fetch(new Request(url))
    responseBody = await response.text()

    return new Response(
      responseBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}


async function checkSecurityHeaders(pubKey, request, body) {
  const signature = request.headers.get('X-Signature-Ed25519')
  const timestamp = request.headers.get('X-Signature-Timestamp')

  const verified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(pubKey, 'hex'),
  )
  if (!verified)
    return new Response('Security header violation', {
      status: 403,
    })
}