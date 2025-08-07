async function handleSetName(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body.startsWith('.setname')) {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })

    const name = body.replace('.setname', '').trim()
    if (!name) return await sock.sendMessage(from, { text: '⚠️ Provide a new group name.' }, { quoted: msg })

    await sock.groupUpdateSubject(from, name)
    await sock.sendMessage(from, { text: '✅ Group name changed.' }, { quoted: msg })
  }
}

export default handleSetName
