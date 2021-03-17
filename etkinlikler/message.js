
const Discord = require("discord.js")
const db = require("coders.db")

module.exports = message => {/*global client*/
  /*
let prefixes = ["-","?"]
let prefix = false;
for (var thisPrefix of prefixes) {
    if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
*/
  
  if(message.author.bot) return
  
  if(message.content.startsWith("?")) {
    let command = message.content.toLowerCase().split(" ")[0].slice(1)
    let cmd
    if(client.commands.has(command)) {
      cmd = client.commands.get(command)
   //   return message.reply(`Şuanda bot bakımda komut kullanamazsın.`) //BAKIMDA OLUNCA.
    } else if (client.commands.some(c => c.config.aliases.includes(command))) {
      cmd = client.commands.find(c => c.config.aliases.includes(command));
//return message.reply(`Şuanda bot bakımda komut kullanamazsın.`)
    }
    
    if(cmd) {
    
      if(cmd.config.ownerOnly == true) {
        if(!["670529747297501208","320873010972196879","601700879829041155"].includes(message.author.id)) return message.reply("``"+cmd.config.name+"`` adlı **komutu kullanmak** için **gerekli yetkilerin** bulunmuyor.")
      }
      
      if(message.channel.type === "dm") {
       if(message.channel.type == "dm") return message.channel.send(`Ben **Direkt Mesajlar**da Çalışmıyorum.`)
      }

       try {
        cmd.run({
          message: message,
          args: message.content.split(" ").slice(1),
          Discord: Discord,
          db: db,
          lineUp: require("common-tags").stripIndents,
          settings: {
            developers: ["670529747297501208", "320873010972196879","601700879829041155"],
            links: {
              botInvite: "https://discordapp.com/oauth2/authorize?client_id="+client.user.id+"&scope=bot&permissions=-1",
              server: "https://discord.gg/464jVHN",
              website: "",
            }
          }
        })
      } catch(error) {
        message.reply("`"+cmd.config.name+"` komutu çalıştırılırken hata çıktı lütfen, Bekleyiniz yetkililere hatayı bildirdim!")
        client.channels.cache.get("705190881850032229").send(
          `
⚠ Bir hata bulundu;

**${message.author.tag}** Adlı kullanıcı \`${cmd.config.name}\` adlı komutu kullanırken 
\`\`\`${error}\`\`\`
Adlı hata çıktı!
`)
        console.error(error)
      }
    }
    }
  else {
    if(message.content.startsWith("-")) {
      let command = message.content.toLowerCase().split(" ")[0].slice(1)
    let cmd
    if(client.commands.has(command)) {
      cmd = client.commands.get(command)
   //   return message.reply(`Şuanda bot bakımda komut kullanamazsın.`) //BAKIMDA OLUNCA.
    } else if (client.commands.some(c => c.config.aliases.includes(command))) {
      cmd = client.commands.find(c => c.config.aliases.includes(command));
//return message.reply(`Şuanda bot bakımda komut kullanamazsın.`)
    }
    
    if(cmd) {
    
      if(cmd.config.ownerOnly == true) {
        if(!["670529747297501208","320873010972196879","601700879829041155"].includes(message.author.id)) return message.reply("``"+cmd.config.name+"`` adlı **komutu kullanmak** için **gerekli yetkilerin** bulunmuyor.")
      }
      
      if(message.channel.type === "dm") {
       if(message.channel.type == "dm") return message.channel.send(`Ben **Direkt Mesajlar**da Çalışmıyorum.`)
      }

       try {
        cmd.run({
          message: message,
          args: message.content.split(" ").slice(1),
          Discord: Discord,
          db: db,
          lineUp: require("common-tags").stripIndents,
          settings: {
            developers: ["670529747297501208", "320873010972196879","601700879829041155"],
            links: {
              botInvite: "https://discordapp.com/oauth2/authorize?client_id="+client.user.id+"&scope=bot&permissions=-1",
              server: "https://discord.gg/464jVHN",
              website: "",
            }
          }
        })
      } catch(error) {
        message.reply("`"+cmd.config.name+"` komutu çalıştırılırken hata çıktı lütfen, Bekleyiniz yetkililere hatayı bildirdim!")
        client.channels.cache.get("705190881850032229").send(
          `
⚠ Bir hata bulundu;

**${message.author.tag}** Adlı kullanıcı \`${cmd.config.name}\` adlı komutu kullanırken 
\`\`\`${error}\`\`\`
Adlı hata çıktı!
`)
        console.error(error)
      }
    }
    }
  }

  }