module.exports = {
config: {
    name: "ayarla",
  aliases: [],
  help: {
    description: "",
    usage: "",
    category: "Ayarlanabilir",
  },
  serverOnly: false,
  ownerOnly: false,
  permissions: {
    bot: [],
    user: []
  }
},
run: async function({ message, Discord, db, args, lineUp, settings }) { /*global client*/
let ayarlanabilir = 
[
  "seviye-kanal",
  "seviye-mesaj"//başka varsa , var ekle
]



let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username+ " Ayarlanabilir sistemler komutu",client.user.avatarURL())
.setTitle("Ayarlanabilir komutlar;")
.setDescription(`\`${ayarlanabilir.join(",")}\` `)
.setColor("RANDOM")
.setFooter(client.user.username,client.user.avatarURL())


if(args[0] == "seviye-kanal"){
let kanal = message.mentions.channels.first()
if(!kanal) return message.reply(`Lütfen bir kanal ayarlayınız.`)
let embed2 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(client.user.username,client.user.avatarURL())
.setDescription(`**Seviye kanalı bundan sonra:** ${kanal} **olarak ayarlandı.**`)
message.channel.send(embed2).then(x => x.react("✅"))
message.react("❤")
db.set(`${message.guild.id}.seviye.kanal`, kanal.id)
}else if (args[0] == "seviye-mesaj"){
  let mesaj = args.slice(1).join(" ")
  if(!mesaj) return message.reply(`Lütfen bir mesaj belirtiniz.
Değişkenler:
\`{seviye}\` ve \`{kişi}\``)
  let embed3 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(client.user.username,client.user.avatarURL())
.addField(`Yazılan mesaj:`, `\`\`\`${mesaj}\`\`\``)
.addField(`Mesaj Önizlemesi:`, mesaj.replace("{seviye}",Math.floor(Math.random() * 50) + 1).replace("{kişi}", client.user.username))
message.channel.send(embed3).then(x => x.react("✅"))
message.react("❤")
db.set(`${message.guild.id}.seviye.mesaj`, mesaj)
  } else {
    message.channel.send(embed)
  }
}
}