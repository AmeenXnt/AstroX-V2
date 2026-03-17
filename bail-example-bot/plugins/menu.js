module.exports = {
  command: "menu",

  run: async ({ sock, m }) => {

    await sock.sendMessage(
      m.key.remoteJid,
      {
        text: "Interactive menu using @eypzx/baileys",
        footer: "https://github.com/EypzX/baileys",
        buttons: [
          {
            buttonId: "repository",
            buttonText: { displayText: "Open Repository" },
            type: 1
          },
          {
            buttonId: "action",
            buttonText: { displayText: "Open Menu" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify({
                title: "Baileys Menu",
                sections: [
                  {
                    title: "Examples",
                    rows: [
                      {
                        header: "Example",
                        title: "Buttons",
                        description: "Show button message",
                        id: "buttons"
                      },
                      {
                        header: "Example",
                        title: "Image",
                        description: "Show media message",
                        id: "image"
                      }
                    ]
                  }
                ]
              })
            }
          }
        ],
        headerType: 1
      },
      { quoted: m }
    )

  }
}
