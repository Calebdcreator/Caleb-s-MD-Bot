import fetch from 'node-fetch';

async function nsfwspank(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/spank');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Spank' }, { quoted: msg });
}

export default nsfwspank;
