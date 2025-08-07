import fetch from 'node-fetch'

async function handleAnimeQuote(sock, msg) {
  const res = await fetch('https://animechan.xyz/api/random')
  const quote = await res.json()
  const text = `🗨️ "${quote.quote}"\n\n— ${quote.character} (${quote.anime})`
  await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg })
}

export default handleAnimeQuote
