import fetch from 'node-fetch';

async function nsfwanal(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/anal');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Anal' }, { quoted: msg });
}

export default nsfwanal;
