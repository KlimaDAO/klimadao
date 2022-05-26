export default async function handler( req, res ) {
  console.log(process.env.MOBILUM_API_KEY)

  if (req.method !== 'POST') {
    return res.status(404).json({status: 'Not found'})
  }

  if ( !req.body ) {
    return res.status(500).json({error: 'Internal server error'})
  }

  const reqBody = JSON.parse(req.body)

  console.log(`reqBody: ${reqBody}`)

  if (!reqBody.address) {
    return res.status(500).json({error: 'Internal server error'})
  }

  const mobilumUrl = new URL('https://api.mobilum.com/widget/GetWidget')
  mobilumUrl.searchParams.set('walletAddress', reqBody.address)

  const body = {}

  const widgetResponse = await fetch(mobilumUrl.href, {
    method: 'POST',
    headers: {
      'ApiKey': process.env.MOBILUM_API_KEY as string,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  })

  if (!widgetResponse) {
    return res.status(500).json({error: 'Internal server error'})
  }

  const json = await widgetResponse.json()

  const htmlBuffer = Buffer.from(json.result.widgetBase64Html, 'base64')
  const html = htmlBuffer.toString()

  const scriptUrlBuffer = Buffer.from(json.result.widgetBase64ScriptUrl, 'base64')
  const scriptUrl = scriptUrlBuffer.toString()

  res.status(200).json({html, scriptUrl})
}
