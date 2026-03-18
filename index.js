const fs = require("fs")
const path = require("path")
const P = require("pino")
const config = require('./config')

const {
  default: makeWAAstroet,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@eypzx/baileys")

const plugins = []

// Load plugins
const pluginDir = path.join(__dirname, "plugins")

if (fs.existsSync(pluginDir)) {
  fs.readdirSync(pluginDir).forEach(file => {
    if (file.endsWith(".js")) {
      const plugin = require(path.join(pluginDir, file))
      plugins.push(plugin)
    }
  })
}

async function startBot() {

  const { state, saveCreds } = await useMultiFileAuthState("./session")

  const { version } = await fetchLatestBaileysVersion()

  const Astro = makeWAAstroet({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: false
  })

  Astro.ev.on("creds.update", saveCreds)

  // Connection handler
  Astro.ev.on("connection.update", (update) => {

    const { connection, lastDisconnect } = update

    if (connection === "open") {
      console.log("Bot connected successfully")
     /*   var BotName = config.BOT_NAME
        var User = config.OWNER_NAME
        var UserNo = config.OWNER_NUMBER
        var Version = "_Comming Soon_"
        var Update = "_Comming Soon_"
        var ImgUrl = ""
        var StartM = `
     *BOT CONNECTED✅*
     
     *Version:* ${Version}
     *Bot Name:* ${BotName}
     *Owner:* ${User}
     *Controller:* ${UserNo}
     *Developer:* _AmeenInt_
     *Dev Contact:* _+916238768108_
     *Update:* ${Update}
     `
     Astro.sendMessage(
      Astro.user.id,
      {
        image: { url: "https://files.catbox.moe/dfrd9b.jpg" },
        caption: StartM,
        title: "AstroX V2",
        subtitle: "Multifunctional WhatsApp Bot",
        footer: "© Powered By Team Keiko",
        ai: true,
        media: true,
        interactiveButtons: [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "Check Speed",
              id: ".ping"
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Developer Contact",
              url: "https://wa.me/916238768108?text=_Hello+AmeenInt🗣️_"
            })
          }
        ]
      }
    )*/
    }

    if (connection === "close") {

      const reason = lastDisconnect?.error?.output?.statusCode

      if (reason === DisconnectReason.loggedOut) {
        console.log("Session logged out. Delete session and pair again.")
      } else {
        console.log("Disconnected. Retrying in 10s...")
        setTimeout(startBot, 10000)
      }

    }

  })

  // Message handler
  Astro.ev.on("messages.upsert", async ({ messages }) => {

    const m = messages[0]
    if (!m.message) return

    const msg =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      ""
 var Prefix = config.PREFIX
    if (!msg.startsWith(Prefix)) return

    const command = msg.slice(1).split(" ")[0].toLowerCase()

    for (const plugin of plugins) {

      if (plugin.command === command) {

        try {
          await plugin.run({ Astro, m, msg })
        } catch (err) {
          console.log("Plugin error:", err)
        }

      }

    }

  })

}

startBot()
