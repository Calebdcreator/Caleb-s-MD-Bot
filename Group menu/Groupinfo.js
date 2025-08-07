async function handleGroupInfo(sock, msg, body) {
  const from = msg.key.remoteJid

  if (body === '.groupinfo') {
    const groupMeta = await sock.groupMetadata(from)
    const owner = groupMeta.owner?.split('@')[0]
    const members = groupMeta.participants.length
    const name = groupMeta.subject
    const desc = groupMeta.desc || 'No Description'

    const info = `📄 *Group Info*
📌 Name: ${name}
👑 Owner: @${owner}
👥 Members: ${members}
📝 Description: ${desc}`

    await sock.sendMessage(from, { text: info, mentions: [groupMeta.owner] }, { quoted: msg })
  }
}

export default handleGroupInfo
