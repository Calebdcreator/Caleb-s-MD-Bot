import warnDB from './warn.js'

async function handleResetWarn(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin
  const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

  if (body.startsWith('.resetwarn')) {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })
    if (!mentioned) return await sock.sendMessage(from, { text: '⚠️ Mention someone.' }, { quoted: msg })

    const id = mentioned[0]
    warnDB[from][id] = 0
    await sock.sendMessage(from, { text: `✅ Warnings for @${id.split('@')[0]} reset.`, mentions: [id] }, { quoted: msg })
  }
}

export default handleResetWarn
