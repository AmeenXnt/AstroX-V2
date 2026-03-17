module.exports = {
  command: "quick",

  run: async ({ sock, m }) => {

    await sock.sendMessage(
      m.key.remoteJid,
      {
        text: "Quick reply example using @eypzx/baileys",
        interactiveButtons: [
          {
            id: "repo",
            displayText: "Repository"
          },
          {
            id: "example",
            displayText: "More Examples"
          }
        ]
      },
      { quoted: m }
    )

  }
}
