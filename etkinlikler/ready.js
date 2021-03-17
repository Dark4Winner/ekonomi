const Discord = require('discord.js');
module.exports = () => { /*global client*/
  client.user.setPresence({
        activity: {
            name: `💪🏻 Bot Yapılıyor %61 | -yardım!`,
            type: "WATCHING"
        },
        status: "idle"
    })
  console.warn("Hazır.")
};