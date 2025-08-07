import fetch from 'node-fetch';

async function nsfwbdsm(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/bdsm');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW BDSM' }, { quoted: msg });
}

export default nsfwbdsm;
