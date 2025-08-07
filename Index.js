import { Boom } from '@hapi/boom'
import figlet from 'figlet'
import { useMultiFileAuthState, DisconnectReason, makeWASocket } from '@adiwajshing/baileys'
import pino from 'pino'
import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import axios from 'axios'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PASSWORD = "IUC1234"
const PREFIX = "."

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = makeWASocket({
    printQRInTerminal: false,
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: ['Caleb MD', 'Chrome', '1.0']
  })

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) startBot()
    } else if (connection === 'open') {
      console.log(chalk.green(figlet.textSync('Caleb MD Bot')))
    }
  })

  sock.ev.on('creds.update', saveCreds)

  const userAuth = {}

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return
    const from = msg.key.remoteJid
    const type = Object.keys(msg.message)[0]
    const body = (type === 'conversation') ? msg.message.conversation :
                 (type === 'imageMessage') ? msg.message.imageMessage.caption :
                 (type === 'videoMessage') ? msg.message.videoMessage.caption :
                 (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
    if (!body.startsWith(PREFIX)) return
    const command = body.slice(PREFIX.length).trim().split(/ +/).shift().toLowerCase()

    if (!userAuth[from] && command === 'menu') {
      await sock.sendMessage(from, { text: '🔐 Enter password to access menu:' }, { quoted: msg })
      userAuth[from] = { waitingForPassword: true }
      return
    }

    if (userAuth[from]?.waitingForPassword) {
      if (body === PASSWORD) {
        userAuth[from] = { authenticated: true }
        await sock.sendMessage(from, { text: '✅ Access granted!' })

        const audioPath = path.join(__dirname, 'shakira.mp3')
        if (fs.existsSync(audioPath)) {
          await sock.sendMessage(from, { audio: { url: audioPath }, mimetype: 'audio/mp4', ptt: false })
        }

        await sock.sendMessage(from, {
          text:
`📂 *Main Menu*
👥 .groupmenu
🎌 .animemenu
🔞 .18menu
🛠️ .toolsmenu
🎬 .mediamenu
📚 .educationalmenu
🎮 .gamesmenu
🤖 .aigenerationmenu`
        })
      } else {
        await sock.sendMessage(from, { text: '❌ Incorrect password. Try again.' })
      }
      return
    }

    if (!userAuth[from]?.authenticated) return
  })
}

startBot()
