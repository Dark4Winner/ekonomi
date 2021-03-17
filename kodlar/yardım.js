module.exports = {
  config: {
    name: "yardım",
    aliases: ["komutlar", "komut"],
    help: {
      description:
        "Botun komutlarını gösterir veya bir komut hakkında bilgi verir.",
      usage: "-yardım [komut]",
      category: "Genel"
    },
    serverOnly: false,
    ownerOnly: false,
    accountOnly: false,
    permissions: {
      bot: ["EMBED_LINKS"],
      user: []
    }
  },

  run: function({ message, Discord, db, args, lineUp, settings }) {
    /*global client*/

    let Enflasyon = 12.300
 
    if (!args[0]) {
      let embed = new Discord.MessageEmbed().setTitle("Komutlar")
        .setDescription(lineUp`
             Ülkedeki Enflasyon değeri: %${Enflasyon.toFixed(2)}
                      
          **Genel komutlar:** ${client.commands
            .filter(x => x.config.help.category == "Genel")
            .map(x => "`" + x.config.name + "`")
            .join(" **|** ")}

           **Soygun komutları:** ${client.commands
             .filter(x => x.config.help.category == "Soygun")
             .map(x => "`" + x.config.name + "`")
             .join(" **|** ")}

          **Ekonomi komutları:** ${client.commands
            .filter(x => x.config.help.category == "Ekonomi")
            .map(x => "`" + x.config.name + "`")
            .join(" **|** ")}

          **Ayarlanabilir komutları:** ${client.commands
            .filter(x => x.config.help.category == "Ayarlanabilir")
            .map(x => "`" + x.config.name + "`")
            .join(" **|** ")}
        `);
      message.channel.send(embed);
    } else if (args[0]) {
      let cmd;
      if (client.commands.get(args[0])) {
        cmd = client.commands.get(args[0]);
      } else if (
        client.commands.some(c => c.config.aliases.includes(args[0]))
      ) {
        cmd = client.commands.find(c => c.config.aliases.includes(args[0]));
      } else {
        return message.reply("**Aradığınız komut bulunamadı.**");
      }

      let embed = new Discord.MessageEmbed().setTitle(cmd.config.name)
        .setDescription(lineUp`
          ${cmd.config.help.description}
          **Kullanım:** ${cmd.config.help.usage}
          **Kategori:** ${cmd.config.help.category}
          **Diğer adları;** ${cmd.config.aliases
            .map(x => "`" + x + "`")
            .join(" **|** ") || "Yok"}
        `);
      message.channel.send(embed);
    }
  }
};
