async function handleKick(sock, msg, body) {
  const from = msg.key.remoteJid
  const isGroup = from.endsWith('@g.us')
  if (!isGroup) return

  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
  if (body.startsWith('.kick')) {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only admins can use this command.' }, { quoted: msg })
    if (!mentioned || mentioned.length === 0) return await sock.sendMessage(from, { text: '⚠️ Tag the user you want to kick.' }, { quoted: msg })
    if (mentioned.includes(sock.user.id)) return await sock.sendMessage(from, { text: '🤖 I cannot remove myself.' }, { quoted: msg })

    await sock.groupParticipantsUpdate(from, mentioned, 'remove')
    await sock.sendMessage(from, { text: `✅ Removed: @${mentioned[0].split('@')[0]}`, mentions: mentioned }, { quoted: msg })
  }
}

export default handleKick
