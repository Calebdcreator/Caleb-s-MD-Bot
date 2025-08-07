import fetch from 'node-fetch';

async function nsfwhentai(sock, msg) {
  const res = await fetch('https://nekos.life/api/v2/img/hentai');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Hentai' }, { quoted: msg });
}

export default nsfwhentai;
