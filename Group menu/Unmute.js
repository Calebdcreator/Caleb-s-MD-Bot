async function handleUnmute(sock, msg, body) {
  const from = msg.key.remoteJid
  const sender = msg.key.participant || msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.unmute') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })

    await sock.groupSettingUpdate(from, 'not_announcement')
    await sock.sendMessage(from, { text: '🔊 Group unmuted.' }, { quoted: msg })
  }
}

export default handleUnmute
