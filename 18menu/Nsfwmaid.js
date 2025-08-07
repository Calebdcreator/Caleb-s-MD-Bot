import fetch from 'node-fetch';

async function nsfwmaid(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/maid');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Maid' }, { quoted: msg });
}

export default nsfwmaid;
