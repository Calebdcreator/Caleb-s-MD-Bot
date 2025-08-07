async function handleHidetag(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body.startsWith('.hidetag')) {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })

    const message = body.replace('.hidetag', '').trim() || '👀'
    const mentions = groupMeta.participants.map(p => p.id)
    await sock.sendMessage(from, { text: message, mentions }, { quoted: msg })
  }
}

export default handleHidetag
