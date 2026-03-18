module.exports = {
  command: "buttons",

  run: async ({ Astro, m }) => {

    await Astro.sendMessage(
      m.key.remoteJid,
      {
        text: "Hey I am AstroX V2👋🏻",
        footer: "© Powered By Team Keiko",
        buttons: [
          {
            buttonId: "repo",
            buttonText: { displayText: "*Hey*" },
            type: 1
          },
          {
            buttonId: "docs",
            buttonText: { displayText: "*Leave*" },
            type: 1
          }
        ],
        headerType: 1
      },
      { quoted: m }
    )

  }
}
