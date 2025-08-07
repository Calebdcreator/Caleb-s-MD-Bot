import fetch from 'node-fetch'

async function handleManga(sock, msg, body) {
  const query = body.slice(6).trim()
  if (!query) return await sock.sendMessage(msg.key.remoteJid, { text: '❌ Provide manga name.' }, { quoted: msg })

  const res = await fetch(`https://api.jikan.moe/v4/manga?q=${query}`)
  const json = await res.json()
  const manga = json.data[0]

  const text = `📖 *${manga.title}*\n📚 Volumes: ${manga.volumes}\n⭐ Score: ${manga.score}\n📅 Published: ${manga.published.string}\n🔗 ${manga.url}`
  await sock.sendMessage(msg.key.remoteJid, { image: { url: manga.images.jpg.image_url }, caption: text }, { quoted: msg })
}

export default handleManga
