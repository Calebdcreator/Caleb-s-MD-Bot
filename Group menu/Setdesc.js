async function handleSetDesc(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body.startsWith('.setdesc')) {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })

    const desc = body.replace('.setdesc', '').trim()
    if (!desc) return await sock.sendMessage(from, { text: '⚠️ Provide a group description.' }, { quoted: msg })

    await sock.groupUpdateDescription(from, desc)
    await sock.sendMessage(from, { text: '📝 Group description updated.' }, { quoted: msg })
  }
}

export default handleSetDesc
