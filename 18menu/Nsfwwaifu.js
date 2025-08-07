import fetch from 'node-fetch';

async function nsfwwaifu(sock, msg) {
  const res = await fetch('https://api.waifu.pics/nsfw/waifu');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Waifu' }, { quoted: msg });
}

export default nsfwwaifu;
