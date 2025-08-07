const facts = [
  'Naruto was originally supposed to be a ramen shop owner.',
  'L from Death Note was originally intended to be more “attractive”.',
  'Bleach was rejected by Shonen Jump at first.',
  'One Piece is the best-selling manga of all time.',
  'Attack on Titan’s author based Titans on drunk people.'
]

async function handleAnimeFact(sock, msg) {
  const fact = facts[Math.floor(Math.random() * facts.length)]
  await sock.sendMessage(msg.key.remoteJid, { text: `📘 Anime Fact:\n${fact}` }, { quoted: msg })
}

export default handleAnimeFact
