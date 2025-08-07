async function handleDelete(sock, msg, body) {
  const from = msg.key.remoteJid

  if (body === '.delete') {
    if (!msg.message?.extendedTextMessage?.contextInfo?.stanzaId) return

    await sock.sendMessage(from, {
      delete: {
        remoteJid: from,
        fromMe: true,
        id: msg.message.extendedTextMessage.contextInfo.stanzaId,
        participant: msg.message.extendedTextMessage.contextInfo.participant
      }
    })
  }
}

export default handleDelete
