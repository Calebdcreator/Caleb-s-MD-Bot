let warnDB = {}

async function handleWarn(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin
  const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

  if (body.startsWith('.warn')) {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })
    if (!mentioned) return await sock.sendMessage(from, { text: '⚠️ Mention someone to warn.' }, { quoted: msg })

    const id = mentioned[0]
    warnDB[from] = warnDB[from] || {}
    warnDB[from][id] = (warnDB[from][id] || 0) + 1

    if (warnDB[from][id] >= 3) {
      await sock.groupParticipantsUpdate(from, [id], 'remove')
      await sock.sendMessage(from, { text: `🚫 @${id.split('@')[0]} was removed for 3 warnings.`, mentions: [id] })
      warnDB[from][id] = 0
    } else {
      await sock.sendMessage(from, { text: `⚠️ @${id.split('@')[0]} has ${warnDB[from][id]} warning(s).`, mentions: [id] })
    }
  }
}

export default handleWarn
