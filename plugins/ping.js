module.exports = {

  command: "ping",

  run: async ({ sock, m }) => {

    await sock.sendMessage(
      m.key.remoteJid,
      { text: "Pong 🏓 (Powered by @eypzx/baileys)" },
      { quoted: m }
    )

  }

}
