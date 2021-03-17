module.exports = {
  config: {
    name: "ping",
    aliases: [],
    help: {
      description: "botun gecikmesine bakar",
      usage: "-ping",
      category: "Genel"
    },
    serverOnly: false,
    ownerOnly: false,
    permissions: {
      bot: [],
      user: []
    }
  },
  run: async function({ message, Discord, db, lineUp, settings }) {
    /*global client*/
    const mesaj_değeri = Date.now();
    message.channel
      .send(`${message.author} tarafından istendi.`)
      .then(messages => {
        let mesaj = Date.now() - mesaj_değeri;
        let API_değeri = client.ws.ping.toFixed(2);
        let fucked = new Discord.MessageEmbed()
          .setTitle(`:bell: ${client.user.username} Gecikme Değeri!`)
          .setColor(0xff2f2f)
          .addField(":stopwatch: Mesaj Gecikmesi", `${mesaj}ms`, true)
          .addField("🤖 Bot Gecikmesi ", `${API_değeri}ms`, true);
        message.channel.send(fucked);
      });
  }
};
