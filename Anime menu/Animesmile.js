import fetch from 'node-fetch'

async function handleAnimeSmile(sock, msg) {
  const res = await fetch('https://api.waifu.pics/sfw/smile')
  const json = await res.json()
  await sock.sendMessage(msg.key.remoteJid, { image: { url: json.url }, caption: '😊 Anime Smile' }, { quoted: msg })
}

export default handleAnimeSmile
