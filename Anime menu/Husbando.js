import fetch from 'node-fetch'

async function handleHusbando(sock, msg) {
  const res = await fetch('https://api.waifu.pics/sfw/bully') // No real husbando API, using placeholder
  const json = await res.json()
  await sock.sendMessage(msg.key.remoteJid, { image: { url: json.url }, caption: '💙 Random Husbando' }, { quoted: msg })
}

export default handleHusbando
