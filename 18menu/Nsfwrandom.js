import fetch from 'node-fetch';

const endpoints = [
  'https://nekos.life/api/v2/img/anal',
  'https://nekos.life/api/v2/img/boobs',
  'https://nekos.life/api/v2/img/feet',
  'https://nekos.life/api/v2/img/spank',
  'https://nekos.life/api/v2/img/hentai'
];

async function nsfwrandom(sock, msg) {
  const url = endpoints[Math.floor(Math.random() * endpoints.length)];
  const res = await fetch(url);
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Random' }, { quoted: msg });
}

export default nsfwrandom;
