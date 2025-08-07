import fetch from 'node-fetch';

async function nsfwass(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/ass');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Ass' }, { quoted: msg });
}

export default nsfwass;
