import fetch from 'node-fetch'

async function handleAnimeSlap(sock, msg) {
  const res = await fetch('https://api.waifu.pics/sfw/slap')
  const json = await res.json()
  await sock.sendMessage(msg.key.remoteJid, { image: { url: json.url }, caption: '👋 Slap!' }, { quoted: msg })
}

export default handleAnimeSlap
