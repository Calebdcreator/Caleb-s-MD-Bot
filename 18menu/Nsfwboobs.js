import fetch from 'node-fetch';

async function nsfwboobs(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/boobs');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Boobs' }, { quoted: msg });
}

export default nsfwboobs;
