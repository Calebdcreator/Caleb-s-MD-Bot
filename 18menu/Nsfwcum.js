import fetch from 'node-fetch';

async function nsfwcum(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/cum');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Cum' }, { quoted: msg });
}

export default nsfwcum;
