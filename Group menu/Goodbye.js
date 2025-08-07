let goodbyeGroups = []

async function handleGoodbye(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.goodbye on') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only admins can enable goodbye messages.' }, { quoted: msg })
    if (!goodbyeGroups.includes(from)) goodbyeGroups.push(from)
    await sock.sendMessage(from, { text: '👋 Goodbye message enabled.' }, { quoted: msg })
  }

  if (body === '.goodbye off') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only admins can disable goodbye messages.' }, { quoted: msg })
    goodbyeGroups = goodbyeGroups.filter(g => g !== from)
    await sock.sendMessage(from, { text: '🚫 Goodbye message disabled.' }, { quoted: msg })
  }
}

export { goodbyeGroups }
export default handleGoodbye
