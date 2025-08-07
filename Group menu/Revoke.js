async function handleRevoke(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.revoke') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })
    await sock.groupRevokeInvite(from)
    await sock.sendMessage(from, { text: '♻️ Group link revoked.' }, { quoted: msg })
  }
}

export default handleRevoke
