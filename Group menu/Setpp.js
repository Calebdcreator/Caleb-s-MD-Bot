import fs from 'fs'

async function handleSetPP(sock, msg, body) {
  const from = msg.key.remoteJid
  const sender = msg.key.participant || msg.key.remoteJid
  const groupMeta = await sock.groupMetadata(from)
  const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin

  if (body === '.setpp') {
    if (!isAdmin) return await sock.sendMessage(from, { text: '❌ Admins only.' }, { quoted: msg })

    const media = msg.message?.imageMessage
    if (!media) return await sock.sendMessage(from, { text: '⚠️ Send or reply to an image.' }, { quoted: msg })

    const buffer = await sock.downloadMediaMessage(msg)
    await sock.updateProfilePicture(from, buffer)
    await sock.sendMessage(from, { text: '🖼️ Group profile picture updated.' }, { quoted: msg })
  }
}

export default handleSetPP
