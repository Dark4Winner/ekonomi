module.exports = {
  config: {
    name: "günlük",
    aliases: [],
    help: {
      description: "günlük komutunu kullanarak gün gün para kazanırsın.",
      usage: "-günlük",
      category: "Ekonomi"
    },
    serverOnly: false,
    ownerOnly: false,
    permissions: {
      bot: ["EMBED_LINKS"],
      user: []
    }
  },
  run: async function({ message, Discord, db, args, lineUp, settings }) {
    const moment = require('moment'); 
require('moment-duration-format');
    /*global client*/
    var embed = new Discord.MessageEmbed();
    let dbs = require("coders.db");
    const ms = require("parse-ms");

    let sure = await dbs.fetch(`slowmode.${message.author.id}.günlük`);
    let süre = 8.64e7;
    if (sure !== null && süre - (Date.now() - sure) > 0) {
      var zamanObj = ms(süre - (Date.now() - sure));
      embed.setDescription(
        `${message.author.username} Günlük hediyeni zaten aldın **${zamanObj.hours} saat ${zamanObj.minutes} dakika ${zamanObj.seconds} saniye** sonra tekrar gel.`
      );
      embed.setColor("FF9C00");
      message.channel.send(embed);
    } else {
      let random = Math.round(Math.random() * (250 - 10)) + 1;
      db.set(`${message.author.id}.user.günlük`, random);
      var embed = new Discord.MessageEmbed();
      embed.setTitle("Warwick Günlük Para");
      embed.setDescription(`Hediyen hazırlanıyor!`);
      embed.setColor("FF9C00");
      embed.setImage(
        "https://cdn.discordapp.com/attachments/670646707423412244/670997182509219881/giphy.gif"
      );
      const botMsg = await message.channel.send(embed).then(msg => {
        setTimeout(() => {
          msg.delete();
        }, 10100);
        setTimeout(() => {
          message.channel.send(
            `Tebrikler ${message.author.username}! **${random}**TL para kazandın.`
          );
        }, 10100);
      });
      db.add(`para_${message.author.id}`, random);
      dbs.set(`slowmode.${message.author.id}.günlük`, Date.now());
       client.channels.cache.get("703155792085254194").send(`**${message.author.tag}**, Adlı kullanıcı \`Günlük\` ödülünü **${moment(message.createdAt).add(3, "hour").format("LLLL")}** tarihinde aldı.`);
    }
  }
};
