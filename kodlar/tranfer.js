module.exports = {
  config: {
    name: "transfer",
    aliases: [],
    help: {
      description: "belirtiğiniz kullanıcıya bir miktar para ",
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
    /*global client*/

    let user = message.mentions.members.first();
    if (!user) {
      message.channel.send("Transfer yapıcağın kişiyi etiketle.");
    }

    if (user.user.id === message.author.id){
      return message.reply(`Kendinize para takviyesi yapamazsınız.`);
    }
    if (!args[1]) {
      return message.channel.send("Lütfen bir miktar belirtin.");
    }

    let member = await db.fetch(`para_${message.author.id}`);

    let targetuser = await db.fetch(`para_${user.user.id}`);

    if(args[1] <= 0) return message.reply("0 veya daha küçük miktar giremezsin");
    
    if (isNaN(args[1])) return message.reply("-transfer **@isim** `miktar` şeklinde para gönderebilirsiniz");
    
    if (member < args[1]) {
      return message.channel.send(
        `Bu, bakiyenizden daha fazla para. Tekrar deneyin.`
      );
    }

    if (parseInt(args[1] < 1)) {
      return message.reply(`1 tl den az para gönderemezsin.`);
    }

    if (parseInt(args[1] < 0)) {
      return message.reply(`0 tl den az para gönderemezsin.`);
    }

    if (parseInt(args[1] < 0.999999999999999999999999999999999)) {
      return message.reply(`0 tl den az para gönderemezsin.`);
    }

    if (parseInt(args[1] < 0.9)) {
      return message.reply(`0 tl den az para gönderemezsin.`);
    }

    if (
      parseInt(
        args[1] < 0.9999999999999999999999999999999999999999999999999999999
      )
    ) {
      return message.reply(`0 tl den az para gönderemezsin.`);
    }
    if (isNaN(args[1])) return message.reply(lineUp`Sadece sayı yazabilirsin.`);

    if (parseInt(args[1] < 20))
      return message.reply(lineUp`20 tlden az para gönderemezsin..`);
let embed = new Discord.MessageEmbed()
   .setDescription(
      `${message.author.tag}, **${user.user.tag}** adlı kullanıcıya ${
        args[1]
      } TL para gönderdiniz.`)
.setColor("RED")

    db.set(`para_${user.user.id}`, targetuser + parseInt(args[1]));
    db.set(`para_${message.author.id}`, member - parseInt(args[1]));
    message.channel.send(embed)
    client.channels.cache.get("703943815983136780").send(`**${message.author.tag}**, Adlı kullanıcı \`${user.user.tag}\` Adlı kullanıcıya **${args[1]}**TL para gönderdi.`);
  }
};
