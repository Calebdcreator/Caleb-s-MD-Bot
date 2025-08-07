import fetch from 'node-fetch'

async function handleCharacter(sock, msg, body) {
  const query = body.slice(10).trim()
  if (!query) return await sock.sendMessage(msg.key.remoteJid, { text: '❌ Provide character name.' }, { quoted: msg })

  const res = await fetch(`https://api.jikan.moe/v4/characters?q=${query}`)
  const json = await res.json()
  const char = json.data[0]

  const text = `👤 *${char.name}*\n📜 ${char.about?.substring(0, 500)}...\n🔗 ${char.url}`
  await sock.sendMessage(msg.key.remoteJid, { image: { url: char.images.jpg.image_url }, caption: text }, { quoted: msg })
}

export default handleCharacter
