import warnDB from './warn.js'

async function handleWarnings(sock, msg, body) {
  const from = msg.key.remoteJid
  const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

  if (body.startsWith('.warnings')) {
    if (!mentioned) return await sock.sendMessage(from, { text: '⚠️ Mention someone.' }, { quoted: msg })

    const id = mentioned[0]
    const count = warnDB[from]?.[id] || 0
    await sock.sendMessage(from, { text: `⚠️ @${id.split('@')[0]} has ${count} warning(s).`, mentions: [id] }, { quoted: msg })
  }
}

export default handleWarnings
