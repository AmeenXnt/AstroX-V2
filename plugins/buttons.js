module.exports = {
  command: "buttons",

  run: async ({ sock, m }) => {

    await sock.sendMessage(
      m.key.remoteJid,
      {
        text: "Example buttons using @eypzx/baileys",
        footer: "https://github.com/EypzX/baileys",
        buttons: [
          {
            buttonId: "repo",
            buttonText: { displayText: "View Repository" },
            type: 1
          },
          {
            buttonId: "docs",
            buttonText: { displayText: "Documentation" },
            type: 1
          }
        ],
        headerType: 1
      },
      { quoted: m }
    )

  }
}
