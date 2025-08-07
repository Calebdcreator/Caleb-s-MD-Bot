import fetch from 'node-fetch';

async function nsfwlesbian(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/les');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Lesbian' }, { quoted: msg });
}

export default nsfwlesbian;
