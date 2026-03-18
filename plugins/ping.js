const config = require("../config")

module.exports = {

  command: "ping",

  run: async ({ Astro, m }) => {

    var BotName = config.BOT_NAME
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
   await Astro.sendMessage(
      m.key.remoteJid,
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
    )
  }

}
