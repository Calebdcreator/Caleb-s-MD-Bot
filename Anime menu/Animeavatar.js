import fetch from 'node-fetch'

async function handleAnimeAvatar(sock, msg) {
  const res = await fetch('https://api.waifu.pics/sfw/waifu')
  const json = await res.json()
  await sock.sendMessage(msg.key.remoteJid, { image: { url: json.url }, caption: '👾 Anime Avatar' }, { quoted: msg })
}

export default handleAnimeAvatar
