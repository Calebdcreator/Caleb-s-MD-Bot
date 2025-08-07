async function handleAnimeShip(sock, msg) {
  const mentions = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || []
  if (mentions.length < 2) return await sock.sendMessage(msg.key.remoteJid, { text: '👥 Tag two people to ship.' }, { quoted: msg })

  const percent = Math.floor(Math.random() * 100)
  await sock.sendMessage(msg.key.remoteJid, {
    text: `❤️ Love match: ${percent}%\n💞 ${mentions[0].split('@')[0]} 💖 ${mentions[1].split('@')[0]}`,
    mentions
  }, { quoted: msg })
}

export default handleAnimeShip
