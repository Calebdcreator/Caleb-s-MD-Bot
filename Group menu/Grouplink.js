async function handleGroupLink(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.grouplink') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only admins can get the link.' }, { quoted: msg })
    const code = await sock.groupInviteCode(from)
    await sock.sendMessage(from, { text: `🔗 Group link:\nhttps://chat.whatsapp.com/${code}` }, { quoted: msg })
  }
}

export default handleGroupLink
