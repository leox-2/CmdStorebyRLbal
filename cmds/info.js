const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "Rahman Leon",
    role: 0,
    cooldown: 5,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin."
    },
    category: "utility",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message, prefix }) {
    const botPrefix = prefix; // Use the provided bot prefix
    const authorName = "Rahman Leon";
    const authorFB = "https://www.facebook.com/profile.php?id=100037951718438";

    const nowDhaka = moment().tz('Asia/Dhaka');
    const date = nowDhaka.format('MMMM Do YYYY');
    const timeDhaka = nowDhaka.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    const botName = ":)"; // Replace with your actual bot name
    const additionalText = `Thanks for using ${botName}!! 🤖`;

    // Combine the bot information and additional text in a single message
    message.reply(`
      ℹ Bot Information:
      ⏩ Bot Prefix: ${botPrefix}
      👤 Owner: ${authorName}
      🔗 Facebook: [${authorName}](${authorFB})
      📅 Date: ${date}
      🕒 Time (Asia/Dhaka): ${timeDhaka}
      ⏰ Uptime: ${uptimeString}
      
      ${additionalText}
    `);
  },

  onChat: async function ({ event, message, getLang, prefix }) {
    const command = event.body.toLowerCase();
    const botPrefix = prefix.toLowerCase(); // Convert prefix to lowercase for case-insensitive comparison

    if (command.startsWith(botPrefix)) {
        const commandWithoutPrefix = command.slice(botPrefix.length).trim();

        if (commandWithoutPrefix === "info" || commandWithoutPrefix === "owner") {
            this.onStart({ message, prefix });
        }
    }
  }
};