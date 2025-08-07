import fetch from 'node-fetch';

async function nsfwblowjob(sock, msg) {
  const res = await fetch('https://api.waifu.pics/nsfw/blowjob');
  const data = await res.json();
  await sock.sendMessage(msg.key.remoteJid, { image: { url: data.url }, caption: '🔞 NSFW Blowjob' }, { quoted: msg });
}

export default nsfwblowjob;
