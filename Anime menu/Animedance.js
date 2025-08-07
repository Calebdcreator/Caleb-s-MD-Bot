import fetch from 'node-fetch'

async function handleAnimeDance(sock, msg) {
  const res = await fetch('https://api.waifu.pics/sfw/dance')
  const json = await res.json()
  await sock.sendMessage(msg.key.remoteJid, { video: { url: json.url }, caption: '💃 Anime Dance' }, { quoted: msg })
}

export default handleAnimeDance
