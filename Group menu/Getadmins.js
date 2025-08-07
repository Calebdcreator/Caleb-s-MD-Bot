async function handleGetAdmins(sock, msg, body) {
  const from = msg.key.remoteJid

  if (body === '.getadmins') {
    const groupMeta = await sock.groupMetadata(from)
    const admins = groupMeta.participants.filter(p => p.admin).map(p => `@${p.id.split('@')[0]}`)
    const text = `👑 *Group Admins:*\n${admins.join('\n')}`
    await sock.sendMessage(from, { text, mentions: groupMeta.participants.filter(p => p.admin).map(p => p.id) }, { quoted: msg })
  }
}

export default handleGetAdmins
