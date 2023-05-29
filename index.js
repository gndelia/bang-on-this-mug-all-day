const { TwitterApi, EUploadMimeType } = require('twitter-api-v2')

const handler = async () => {
  try {
    console.log(`Triggering post of daily video at ${new Date().toISOString()}`)
    console.log('Initiating Twitter connection')
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    })
    console.log('Uploading video')
    const mediaId = await client.v1.uploadMedia(`./I don't wanna work I just wanna bang on this mug all day-(720p60).mp4`, { mimeType: EUploadMimeType.Mp4 })
    console.log(`mediaId is ${mediaId}. Tweeting...`)
    const { data } = await client.v2.tweet({ media: { media_ids: [mediaId] } })
    console.log(`Posted tweet Id ${data.id} on ${new Date().toISOString()}`)
  } catch (e) {
    console.error(e)
  }
}

module.exports = { handler }