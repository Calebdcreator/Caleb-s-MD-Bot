async function handleCloseGroup(sock, msg, body) {
  const from = msg.key.remoteJid
  const sender = msg.key.participant || msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.closegroup') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })
    await sock.groupSettingUpdate(from, 'announcement')
    await sock.sendMessage(from, { text: '🚫 Group closed (only admins can chat).' }, { quoted: msg })
  }
}

export default handleCloseGroup
