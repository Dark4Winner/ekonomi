module.exports = {
  config: {
    name: "davet",
    aliases: [],
    help: {
      description:
        "botun davet linkini destek sunucusunu ve websitesini görürsünüz.",
      usage: "",
      category: "Genel"
    },
    serverOnly: false,
    ownerOnly: false,
    permissions: {
      bot: [],
      user: []
    }
  },

  run: async function({ message, Discord, db, args, lineUp, settings }) {
    let embed = new Discord.MessageEmbed()
      .addField("Davet Linkim", `[Buraya Tıkla](${settings.links.botInvite})`)
      .addField("Destek Sunucum", `[Buraya Tıkla](${settings.links.server})`)
      .addField("Website", `[Şuanda yok](${settings.links.website})`)
      .setTimestamp()
      .setColor("GREEN");
    message.channel.send(embed);
  }
};
