import fetch from 'node-fetch'

async function handleWaifu(sock, msg) {
  const res = await fetch('https://api.waifu.pics/sfw/waifu')
  const json = await res.json()
  await sock.sendMessage(msg.key.remoteJid, { image: { url: json.url }, caption: '💗 Random Waifu' }, { quoted: msg })
}

export default handleWaifu
