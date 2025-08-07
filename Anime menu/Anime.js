import fetch from 'node-fetch'

async function handleAnimeSearch(sock, msg, body) {
  const query = body.slice(7).trim()
  if (!query) return await sock.sendMessage(msg.key.remoteJid, { text: '🔍 Please provide an anime name.' }, { quoted: msg })

  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=1`)
  const data = await res.json()
  if (!data.data || data.data.length === 0) return await sock.sendMessage(msg.key.remoteJid, { text: '❌ Anime not found.' }, { quoted: msg })

  const anime = data.data[0]
  const caption = `🎌 *${anime.title}*\n📅 Aired: ${anime.aired.string}\n💠 Type: ${anime.type}\n📺 Episodes: ${anime.episodes}\n⭐ Score: ${anime.score}\n🔗 ${anime.url}`
  await sock.sendMessage(msg.key.remoteJid, { image: { url: anime.images.jpg.image_url }, caption }, { quoted: msg })
}

export default handleAnimeSearch
