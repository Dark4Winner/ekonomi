module.exports = {
  config: {
    name: "aylık",
    aliases: [],
    help: {
      description: "aylık olarak paranızı alırsınız.",
      usage: "",
      category: "Ekonomi"
    },
    serverOnly: true,
    ownerOnly: false,
    permissions: {
      bot: [],
      user: []
    }
  },
  run: async function({ message, Discord, db, args, lineUp, settings }) {
    const useful = require('useful-tools')
//const mesaj = require('../mesaj.json')
    /*global client*/

    const ms = require("parse-ms");
    let timeout = 2592000000;
    let amount = 5000;

    let dbs = require("coders.db");

    let monthly = await dbs.fetch(`monthly_${message.author.id}`);

    if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
      let time = ms(timeout - (Date.now() - monthly));

      message.channel.send(
        `Aylık ödülünüzü zaten topladınız, **${time.days}gün ${time.hours}saat ${time.minutes}dakika ${time.seconds}saniye** sonra tekrar gel ve ödülünü al!`
      );
    } else {
      let embed = new Discord.MessageEmbed()
        .setAuthor(`Aylık Ödül`, message.author.displayAvatarURL())
        .setColor("GREEN")
        .setDescription(`**Aylık Ödül**`)
        .addField(`Toplanan Para Miktarı (Aylık Ödülün)`, amount);

      message.channel.send(embed);
      db.add(`para_${message.author.id}`, amount);
      db.set(`monthly_${message.author.id}`, Date.now());
      const moment = require('moment'); 
require('moment-duration-format');
      client.channels.cache.get("703155792085254194").send(`**${message.author.tag}**, Adlı kullanıcı \`Aylık\` ödülünü **${moment(message.createdAt).add(3, "hour").format("LLLL")}** tarihinde aldı.`);
    }
  }
};
