async function handleAnimeFace(sock, msg) {
  await sock.sendMessage(msg.key.remoteJid, { text: '🧠 This feature requires a photo and ML API, currently not available.' }, { quoted: msg })
}

export default handleAnimeFace
