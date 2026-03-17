# Buttons

## 1. Basic Button Message
```bash
    await sock.sendMessage(jid, {
      text: "Basic Button Example",
      footer: "@eypzx/baileys",
      buttons: [
        {
          buttonId: "button1",
          buttonText: { displayText: "Button One" },
          type: 1
        },
        {
          buttonId: "button2",
          buttonText: { displayText: "Button Two" },
          type: 1
        }
      ],
      headerType: 1
    }, { quoted: m })
```
## 2. Interactive Buttons
```bash
    await sock.sendMessage(jid, {
      text: "Interactive Button Example",
      interactiveButtons: [
        { id: "option1", displayText: "Option One" },
        { id: "option2", displayText: "Option Two" },
        { id: "option3", displayText: "Option Three" }
      ]
    }, { quoted: m })
```
## 3. Image Button Message
```bash
  await sock.sendMessage(jid, {
      image: { url: "https://files.catbox.moe/dfrd9b.jpg" },
      caption: "Image Button Example",
      title: "Example Title",
      subtitle: "Example Subtitle",
      footer: "@eypzx/baileys",
      media: true,
      interactiveButtons: [
        {
          name: "quick_reply",
          buttonParamsJson: JSON.stringify({
            display_text: "Quick Reply",
            id: "quick_reply_button"
          })
        },
        {
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Open Website",
            url: "https://github.com/EypzX/baileys"
          })
        }
      ]
    }, { quoted: m })
```
## 4. Menu Style Buttons
```bash
    await sock.sendMessage(jid, {
      text: "Menu Example",
      footer: "@eypzx/baileys",
      buttons: [
        {
          buttonId: "menu1",
          buttonText: { displayText: "Menu Option One" },
          type: 1
        },
        {
          buttonId: "menu2",
          buttonText: { displayText: "Menu Option Two" },
          type: 1
        },
        {
          buttonId: "menu_action",
          buttonText: { displayText: "Menu List" },
          type: 4,
          nativeFlowInfo: {
            name: "single_select",
            paramsJson: JSON.stringify({
              title: "Example Menu",
              sections: [
                {
                  title: "Baileys Example",
                  rows: [
                    {
                      header: "Section Header",
                      title: "First Option",
                      description: "Example Description",
                      id: "menu_first"
                    },
                    {
                      header: "Section Header",
                      title: "Second Option",
                      description: "Example Description",
                      id: "menu_second"
                    }
                  ]
                }
              ]
            })
          }
        }
      ],
      headerType: 1
    }, { quoted: m })
```
# Ai Tag
```bash
await sock.sendMessage(jid, {text: "hey", ai: true })
```
