import fetch from 'node-fetch'

async function handleAnimeWall(sock, msg) {
  const res = await fetch('https://api.waifu.pics/sfw/wallpaper')
  const json = await res.json()
  await sock.sendMessage(msg.key.remoteJid, { image: { url: json.url }, caption: '🖼️ Anime Wallpaper' }, { quoted: msg })
}

export default handleAnimeWall
