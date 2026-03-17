# Baileys Example Bot

- this repository shows how to create a simple plugin-based bot using modified Baileys library

  ## Install

Install Dependencies
```bash
npm install
```
Pairing
```bash
nano config.env
```
Add number
```bash
NUMBER=911234567890
```
Run Pair
```bash
npm run pair
```
connect WhatsApp with pair code

## Connecting Account

WhatsApp provides a multi-device API that allows Baileys to be authenticated as a second WhatsApp client by scanning a **QR code** or **Pairing Code** with WhatsApp on your phone.

### Starting socket with **QR-CODE**

> [!TIP]
> You can customize browser name if you connect with **QR-CODE**, with `Browser` constant, we have some browsers config, **see [here](https://baileys.whiskeysockets.io/types/BrowsersMap.html)**

```javascript
const { default: makeWASocket } = require("@eypzx/baileys")


const sock = makeWASocket({
    // can provide additional config here
    browser: Browsers.ubuntu('My App'),
    printQRInTerminal: true
})
```
### Starting socket with **Pairing Code**


> [!IMPORTANT]
> Pairing Code isn't Mobile API, it's a method to connect Whatsapp Web without QR-CODE, you can connect only with one device, see [here](https://faq.whatsapp.com/1324084875126592/?cms_platform=web)

The phone number can't have `+` or `()` or `-`, only numbers, you must provide country code

```javascript
const { default: makeWASocket } = require("@eypzx/baileys")

const sock = makeWASocket({
    // can provide additional config here
    printQRInTerminal: false //need to be false
})

- Normal Pairing
if (!sock.authState.creds.registered) {
    const number = 'XXXXXXXXXXX'
    const code = await sock.requestPairingCode(number)
    console.log(code)
}

- Costum Pairing
if (!sock.authState.creds.registered) {
    const pair = "ABCD1234" // only 8 alphanumeric (no more or less)
    const number = 'XXXXXXXXXXX'
    const code = await sock.requestPairingCode(number, pair)
    console.log(code)
}
```

### Receive Full History

1. Set `syncFullHistory` as `true`
2. Baileys, by default, use chrome browser config
    - If you'd like to emulate a desktop connection (and receive more message history), this browser setting to your Socket config:

```javascript
const sock = makeWASocket({
    ...otherOpts,
    // can use Windows, Ubuntu here too
    browser: Browsers.macOS('Desktop'),
    syncFullHistory: true
})
```
