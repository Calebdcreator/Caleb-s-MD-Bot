let welcomeGroups = []

async function handleWelcome(sock, msg, body) {
  const from = msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.welcome on') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })
    if (!welcomeGroups.includes(from)) welcomeGroups.push(from)
    await sock.sendMessage(from, { text: '✅ Welcome messages enabled.' }, { quoted: msg })
  }

  if (body === '.welcome off') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })
    welcomeGroups = welcomeGroups.filter(g => g !== from)
    await sock.sendMessage(from, { text: '❌ Welcome messages disabled.' }, { quoted: msg })
  }
}

export default handleWelcome
