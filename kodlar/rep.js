module.exports = {
config: {
    name: "rep",
  aliases: [],
  help: {
    description: "Bir kullanıcıya +rep basarsınız",
    usage: "rep",
    category: "Genel",
  },
  serverOnly: false,
  ownerOnly: false,
  permissions: {
    bot: [],
    user: []
  }
},
run: async function({ message, Discord, db, args, lineUp, settings }) { /*global client*/
   let user = message.mentions.users.first()
  if(!user) return message.reply(`Rep basmak istediğin kullanıcıyı etiketle.`)
  
      const ms = require("parse-ms");
    let timeout = 9999999999999;
    let amount = 5000;

    let dbs = require("coders.db");

    let rep = await dbs.fetch(`repSonsuzluk_${message.author.id + user.id}`);

    if (rep !== null && timeout - (Date.now() - rep) > 0) {
      let time = ms(timeout - (Date.now() - rep));

      message.channel.send(
        `Bu kullanıcıya daha önce zaten **REP** bastınız.`
      );
    } else {
      

      if(user.id == message.author.id) return message.reply(`Zeki, çocuk. Kendine rep basamazsın.`)
var rep_puan = (await db.fetch(`reppuan_${user.id}`)) || 0
      
  const embed = new Discord.MessageEmbed().setTitle(client.user.username)
  .setAuthor(message.author.username,message.author.avatarURL())
  .setDescription(`${message.author.tag}, ${user.tag} Adlı kullanıcıya 1 Rep gönderdi.`)
  .setColor("RANDOM")
  .setFooter(client.user.username, client.user.avatarURL())

  message.channel.send(embed)
      db.set(`repSonsuzluk_${message.author.id + user.id}`, Date.now())
  db.add(`reppuan_${user.id}`, 1)
  
//var rep_puan = (await db.fetch(`reppuan_${user.id}`)) || 0
    }
}
}