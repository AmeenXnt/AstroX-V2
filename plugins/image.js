module.exports = {
  command: "image",

  run: async ({ Astro, m }) => {

    await Astro.sendMessage(
      m.key.remoteJid,
      {
        image: { url: "https://files.catbox.moe/dfrd9b.jpg" },
        caption: "Example media message using @eypzx/baileys",
        title: "@eypzx/baileys",
        subtitle: "Interactive Message Example",
        footer: "https://github.com/EypzX/baileys",
        media: true,
        interactiveButtons: [
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "Show Repository",
              id: ".ping"
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Open GitHub",
              url: "https://github.com/EypzX/baileys"
            })
          }
        ]
      },
      {
        quoted: m
      }
    )

  }
}
