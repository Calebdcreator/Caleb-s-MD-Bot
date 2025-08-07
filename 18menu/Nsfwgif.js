import fetch from 'node-fetch';

async function nsfwgif(sock, msg) {
  const res = await fetch('https://api.waifu.pics/nsfw/waifu');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { video: { url: data.url }, caption: '🔞 NSFW Gif' }, { quoted: msg });
}

export default nsfwgif;
