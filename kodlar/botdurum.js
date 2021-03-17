module.exports = {
config: {
    name: "bot-durum",
  aliases: ["botdurumu","durum","bot-durumu","botdurum"],
  help: {
    description: "",
    usage: "",
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
let pingmesaj;
let pingdurum;



/*for(var emojilers in client.emojiler){
let emojis = client.emojis.cache.get(emojilers)
}*/
if(client.ws.ping > 30){
pingmesaj = ":green_circle:"
pingdurum = "#66ff00"
}
if(client.ws.ping < 30){
pingmesaj = ":green_circle:"
pingdurum = "#66ff00"
}
if(client.ws.ping > 60){
pingmesaj = ":orange_circle:"
pingdurum = "#ffff00"
}
 if(client.ws.ping < 60){
pingmesaj = ":orange_circle:"
pingdurum = "#ffff00"
}
if(client.ws.ping > 100){
pingmesaj = ":red_circle:"
pingdurum = "#ff0000"
}
if(client.ws.ping < 100){
pingmesaj = ":red_circle:"
pingdurum = "#ff0000"
}
if(client.ws.ping > 150){
pingmesaj = ":red_circle:"
pingdurum = "#ff0000"
}
if(client.ws.ping > 250){
pingmesaj = ":red_circle:"
pingdurum = "#ff0000"
}
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.username + " Adlı kullanıcı tarafından istendi.",message.author.avatarURL())
.setThumbnail(message.author.avatarURL())
.setDescription(`Bot Durumu: ${pingmesaj}\nGecikme: ${client.ws.ping}`)
.setColor(pingdurum)
.setFooter(client.user.username, client.user.avatarURL())
message.channel.send(embed)

}
}