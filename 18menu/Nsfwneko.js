import fetch from 'node-fetch';

async function nsfwneko(sock, msg) {
  const res = await fetch('https://api.waifu.pics/nsfw/neko');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Neko' }, { quoted: msg });
}

export default nsfwneko;
