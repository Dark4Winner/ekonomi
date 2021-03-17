let superagent = require("superagent")
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(` aga be bir sıkıntı var galiba`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
      superagent.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);


let db = require("coders.db")
const moment = require('moment'); 
require('moment-duration-format');
moment.locale("tr")
const Discord = require("discord.js")
const client = new Discord.Client()
global.client = client

client.commands = new Discord.Collection()

client.db = db

client.log = (...args) => {
moment.locale("tr")
  return console.log(`[${moment(new Date()).add(3, "hour").format("LLLL")}] => ${args.join(", ")}`)

}

for(const cmd of Object.values(require('require-all')("/app/kodlar"))) {
  client.commands.set(cmd.config.name, cmd);
  client.log(`"${cmd.config.name}" kodu yüklendi.`)
} 

require("fs-extra").readdir("/app/etkinlikler", async function(error, files) {
  if(error) console.error(error);
  let jsFiles = files.filter(file => file.split(".").pop() === "js");
  jsFiles.forEach(async function(file) {
    client.on(file.split(".").slice(0, (file.split(".").length - 1)).join(""), require(`/app/etkinlikler/${file}`))
    client.log(`"${file.split(".").slice(0, (file.split(".").length - 1)).join("")}" etkinliği yüklendi.`)
  })
})


/*client.on("message", async (message) => {
  if(message.content.includes(`<@!${client.user.id}>`)) { message.channel.send(`Merhaba **${message.author.tag}** ben: **${client.user.tag}** Bu sunucuya sizi eğlendirmek için geldim komutlarımı görmek için \`-yardım\`.`)}
})*/

client.on("message", async (message) => {
let süre = setTimeout(async() =>{
  if(message.author.bot) return
await db.delete(`soygun_${message.author.id}`)
  console.warn(`${message.author.tag} (${message.author.id}) adlı kullanıcının soygun sistemi sıfırlandı.`)
  clearInterval(süre)
}, 300000)
})

  
/*setInterval(async() =>{
  await db.delete(`para_187616494631256065`)
  console.log(`Anılcanın parası sıfırlandı`)
}, 900000)*/



client.token = "NjkyNzI2NTQ2NTU3MDQyNzU4.XpLKOg.GNXftS-GPDBTObiZLSKCSQXUB-U";
client.login(client.token)


client.on("message", async msg => {
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puancik_${msg.author.id + msg.guild.id}`, 5)
    db.add(`xpsira_${msg.author.id + msg.guild.id}`, 5)
};

  if (db.fetch(`puancik_${msg.author.id + msg.guild.id}`) > 300) {
    let kanal = client.channels.cache.get(await db.get(`${msg.guild.id}.seviye.kanal`)) || msg.channel
    let mesaj = await db.get(`${msg.guild.id}.seviye.mesaj`) || `**${msg.author}, Tebrikler başarıyla ${await db.get(`seviye_${msg.author.id + msg.guild.id}`) || 1} seviyeye ulaştın!**`
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
    
    db.delete(`puancik_${msg.author.id + msg.guild.id}`)
   kanal.send(mesaj.replace("{seviye}", await db.get(`seviye_${msg.author.id + msg.guild.id}`) || 1).replace("{kişi}", msg.author))
  };
});
/*
client.on("message", async message => {
    let cooldown = 86400000;

    let ms = require("parse-ms");

  if(message.author.bot) return
  let kişi = message.member.id
    let weekly = await db.fetch(`${kişi}.kalkan_süre2`)

    if (weekly !== null && cooldown - (Date.now() - weekly) > 0) {
      let time = ms(cooldown - (Date.now() - weekly));

      console.log(
        `${message.author.tag} - ${time.minutes} dakika ${time.seconds} saniye içinde hala kalkan sürüyor`
      );
    } else {
      db.set(`${message.author.id}.kalkan`,false)
      db.delete(`${message.author.id}.kalkan_süre`)
      db.delete(`${message.author.id}.kalkan_süre2`)
      console.log(
      `${message.author.tag} için kalkan sıfırlandı veya bulunmuyor!`
      );
    }
})*/


client.on("message", async msg => {
  const ms = require("parse-ms");

  const sure = await db.fetch(`${msg.author.id}.kalkan_süre2`)
  const zaman = 86400000;

  let cooldown = zaman;

  let süre = sure

  if (süre !== null && cooldown - (Date.now() - süre) > 0) {
    let timeObj = ms(cooldown - (Date.now() - süre));
          console.log(
        `${msg.author.tag} - ${timeObj.hours} saat  ${timeObj.minutes} dakika ${timeObj.seconds} saniye içinde hala kalkan sürüyor`
      );
  } else {
      db.delete(`${msg.author.id}.kalkan`)
      db.delete(`${msg.author.id}.kalkan_süre`)
      db.delete(`${msg.author.id}.kalkan_süre2`)
  }
});


client.on("message", async message => {
  if(message.author.bot) return
  if(message.author.id === client.user.id) return
if(message.content.includes("<@!"+ client.user.id + ">")){
  let mesaj;
  let args = message.content.split(" ").slice(0)
  if(!args[0]) mesaj = "Hmm"

 const cleverbot = require("cleverbot-free");
    mesaj = args.join(" ").replace("<@!"+ client.user.id + ">", "")

cleverbot(mesaj).then(response => message.reply(`💬 ${response || "Bug'luyum xD"}`) + console.log(`${mesaj} => ${response}`)).catch(x => message.channel.send(x))
  
}
})
/*

//</> Premium </>

setInterval(async () => {
client.guilds.forEach(async sunucu => {


//KODUNNN

  let premiumsure = db.fetch(`premiumsure_${sunucu.id}`);
  let premiumzaman = db.fetch(`premiumzaman_${sunucu.id}`);
  if (db.has(`premiumsure_${sunucu.id}`) === false);

  let cooldown = premiumsure;

  if (premiumzaman !== null && cooldown - (Date.now() - premiumzaman) > 0) {
    let time = ms(cooldown - (Date.now() - premiumzaman));

    db.set(`premium_${sunucu.id}`, "aktif");
  } else {
    db.delete(`premium_${sunucu.id}`);
    db.delete(`premiumzaman_${sunucu.id}`);
    db.delete(`premiumsure_${sunucu.id}`);
  }
})
}, 60000)

//</> Premium </>

//</> Gold </>

client.on("message", msg => {
  const ms = require("parse-ms");
  if (db.has(`gold_${msg.author.id}`) === false);
  const sure = db.fetch(`goldsure_${msg.author.id}`);
  const zaman = db.fetch(`goldvaxt_${msg.author.id}`);

  let cooldown = zaman;

  let süre = db.fetch(`goldzaman_${msg.author.id}`);

  if (süre !== null && cooldown - (Date.now() - süre) > 0) {
    let timeObj = ms(cooldown - (Date.now() - süre));
  } else {
    db.delete(`goldsure_${msg.author.id}`);
    db.delete(`gold_${msg.author.id}`);
    db.delete(`goldverildi_${msg.author.id}`);
  }
});

//</> Gold </>

*/
