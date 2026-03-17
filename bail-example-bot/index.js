const fs = require("fs")
const path = require("path")
const P = require("pino")

const {
  default: makeWASocket,
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

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    printQRInTerminal: false
  })

  sock.ev.on("creds.update", saveCreds)

  // Connection handler
  sock.ev.on("connection.update", (update) => {

    const { connection, lastDisconnect } = update

    if (connection === "open") {
      console.log("Bot connected successfully")
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
  sock.ev.on("messages.upsert", async ({ messages }) => {

    const m = messages[0]
    if (!m.message) return

    const msg =
      m.message.conversation ||
      m.message.extendedTextMessage?.text ||
      ""

    if (!msg.startsWith(".")) return

    const command = msg.slice(1).split(" ")[0].toLowerCase()

    for (const plugin of plugins) {

      if (plugin.command === command) {

        try {
          await plugin.run({ sock, m, msg })
        } catch (err) {
          console.log("Plugin error:", err)
        }

      }

    }

  })

}

startBot()