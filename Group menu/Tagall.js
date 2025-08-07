async function handleTagAll(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.tagall') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only admins can use this.' }, { quoted: msg })

    const mentions = groupMeta.participants.map(p => p.id)
    const text = mentions.map(u => `@${u.split('@')[0]}`).join(' ')
    await sock.sendMessage(from, { text, mentions }, { quoted: msg })
  }
}

export default handleTagAll
