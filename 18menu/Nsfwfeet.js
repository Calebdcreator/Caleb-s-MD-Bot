import fetch from 'node-fetch';

async function nsfwfeet(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/feet');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Feet' }, { quoted: msg });
}

export default nsfwfeet;
