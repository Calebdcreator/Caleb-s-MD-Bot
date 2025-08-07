async function handlePromote(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin
  const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid

  if (body.startsWith('.promote')) {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only admins can promote.' }, { quoted: msg })
    if (!mentioned) return await sock.sendMessage(from, { text: '⚠️ Mention a user to promote.' }, { quoted: msg })

    await sock.groupParticipantsUpdate(from, mentioned, 'promote')
    await sock.sendMessage(from, { text: `✅ Promoted: @${mentioned[0].split('@')[0]}`, mentions: mentioned }, { quoted: msg })
  }
}

export default handlePromote
