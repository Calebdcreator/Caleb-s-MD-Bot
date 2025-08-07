let antiLinkGroups = []

async function handleAntiLink(sock, msg, body) {
  const from = msg.key.remoteJid
  const isGroup = from.endsWith('@g.us')
  if (!isGroup) return

  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.antilink') {
    if (!isAdmin) return await sock.sendMessage(from, { text: 'Only admins can enable anti-link.' }, { quoted: msg })
    if (antiLinkGroups.includes(from)) return await sock.sendMessage(from, { text: 'Anti-link is already enabled.' }, { quoted: msg })
    antiLinkGroups.push(from)
    await sock.sendMessage(from, { text: '✅ Anti-link enabled.' }, { quoted: msg })
  }

  if (body === '.disableantilink') {
    if (!isAdmin) return await sock.sendMessage(from, { text: 'Only admins can disable anti-link.' }, { quoted: msg })
    antiLinkGroups = antiLinkGroups.filter(g => g !== from)
    await sock.sendMessage(from, { text: '❌ Anti-link disabled.' }, { quoted: msg })
  }

  if (antiLinkGroups.includes(from)) {
    if (body.match(/(https:\/\/chat\.whatsapp\.com\/)/gi)) {
      if (!isAdmin) {
        await sock.sendMessage(from, { text: `⚠️ Anti-link violation detected. Removing...` }, { quoted: msg })
        await sock.groupParticipantsUpdate(from, [sender], 'remove')
      }
    }
  }
}

export default handleAntiLink
