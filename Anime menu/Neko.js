import fetch from 'node-fetch'

async function handleNeko(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/neko')
  const json = await res.json()
  await sock.sendMessage(msg.key.remoteJid, { image: { url: json.url }, caption: '🐱 Neko Girl' }, { quoted: msg })
}

export default handleNeko
