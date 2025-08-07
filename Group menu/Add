async function handleAdd(sock, msg, body) {
  const from = msg.key.remoteJid
  const isGroup = from.endsWith('@g.us')
  if (!isGroup) return

  const groupMeta = await sock.groupMetadata(from)
  const sender = msg.key.participant || msg.key.remoteJid
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body.startsWith('.add')) {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Only admins can use this command.' }, { quoted: msg })

    const args = body.split(' ')
    if (args.length < 2) return await sock.sendMessage(from, { text: '⚠️ Provide the number to add.\nExample: `.add 2349012345678`' }, { quoted: msg })

    const number = args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net'

    try {
      await sock.groupParticipantsUpdate(from, [number], 'add')
      await sock.sendMessage(from, { text: `✅ Added: @${args[1]}`, mentions: [number] }, { quoted: msg })
    } catch (e) {
      await sock.sendMessage(from, { text: `❌ Failed to add: ${args[1]}. They may have privacy settings on.` }, { quoted: msg })
    }
  }
}

export default handleAdd
