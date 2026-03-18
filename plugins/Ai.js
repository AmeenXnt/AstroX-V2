module.exports = {
  command: "Ai",

  run: async ({ Astro, m }) => {

    await Astro.sendMessage(m.key.remoteJid, { text: "Hello 👋🏻", ai: true})
  }
}
