module.exports = {
  config: {
    name: "soy",
    aliases: [],
    help: {
      description: "Birini Soyarsınız :)",
      usage: "",
      category: "Soygun"
    },
    serverOnly: false,
    ownerOnly: false,
    permissions: {
      bot: [],
      user: []
    }
  },
  run: async function({ message, Discord, db, args, lineUp, settings }) {
   
      let türler = ["kuyumcu","adam","banka","market"];
      if (!türler.includes(args[0]))
        return message.channel.send(
          lineUp`Soyabiliceğiniz şeyler: \`${türler}\`
\`\`\`Bilgi;\`\`\`
**⭐ Ak47 ile Banka soyarsınız almak için (-blackmarket ak47)

⭐ Uzi ile Kuyumcu soyarsınız almak için (-blackmarket uzi)

⭐Pistol ile Market soyarsınız almak için (-blackmarket pistol)

⭐Bıçak ile adam bıçaklarsınız almak için (-blackmarket bıçak)**

*Örnek: -soy adam @Kullanıcı*
`
        );
    /*global client*/
    let ms = require("parse-ms");

    let timeout = 300000;

    let dbs = require("coders.db");

    let weekly = await dbs.fetch(`soygun_${message.author.id}`);

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
      let time = ms(timeout - (Date.now() - weekly));

      message.reply(
        `Polisler seni heryerde seni arıyor ortalık temizlenince tekrar, soygun yap. (**${time.minutes}dakika ${time.seconds}saniye** beklemelisin)`
      );
    } else {
      let para = await db.fetch(`para_${message.author.id}`);
      
      if (args[0] === "kuyumcu") {
      let ms = require("parse-ms");

      let timeout = 300000;

      let dbs = require("coders.db");

      let weekly = await dbs.fetch(`kuyumcusoygun_${message.author.id}`);

      if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        let time = ms(timeout - (Date.now() - weekly));

        message.reply(
          `Polisler seni heryerde seni arıyor ortalık temizlenince tekrar, kuyumcuyu soyabilirsin. (**${time.minutes}dakika ${time.seconds}saniye** beklemelisin)`
        );
      } else {
       var uziadet = await db.fetch(`${message.author.id}.uzi_adet`);
        if (!uziadet) {
          message.reply("**Yanında `Uzi` olmadığı için kuyumcuyu soyamadın ve 1000 TL paran gitti.**");
           await db.set(`para_${message.author.id}`, para - 1000)
        }
        if (uziadet) {

          let para = Math.floor(Math.random() * 350) + 1;

          db.add(`para_${message.author.id}`, para);

          db.set(`${message.author.id}.uzi_adet`, uziadet - 1);

          db.set(`kuyumcusoygun_${message.author.id}`, Date.now());

          let embed = new Discord.MessageEmbed()
            .setDescription(
              `${message.author.tag}, Kuyumcuyu soydun ve ${para} TL kazandın **burdan uzaklaş polis yaklaşıyor**.`
            )
            .setColor("GREEN")
          .setImage("https://media.indiedb.com/images/groups/1/25/24269/giphy.gif")
            .setTimestamp();
          message.channel.send(embed);
          client.channels.cache.get("703155904777814107").send(`**${message.author.tag}**, Adlı kullanıcı \`Kuyumcu\`'yu soydu ${para}TL kazandı.`)
        }
      }
    }
    if(args[0] === "adam"){
      let user = message.mentions.users.first();
      if (!user) return message.reply(`Soymak istediğiniz kişiyi etiketleyin.`);

      let targetuser = await db.fetch(`para_${user.id}`);
      let author = await db.fetch(`para_${message.author.id}`);

      let random1 = Math.floor(Math.random() * 150) + 1;

      if (user.id === message.author.id)
        return message.reply(`Soymak istediğiniz kişi siz olamazsınız.`);
      if (user.bot === true) {
       return message.reply(`Botları soycak kadar cani olamazsın.`);
      }

      if (author < 50) {
        return message.reply(":x: Birini Soymak için 50₺'ye ihtiyacın var.");
      }

      if (!targetuser) {
        return message.channel.send(
          `:x: ${user.username} adlı kullanıcıda para bulunamadı.`
        );
      }
      
      var bıçak = await db.fetch(`${message.author.id}.bıçak_adet`)
    if(!bıçak) return message.reply(`**${user.tag}** adlı kullanıcıyı soymak için \`Bıçak\` lazım.`)
      
      if(db.has(`${user.id}.kalkan`) === true) {
        db.set(`para_${message.author.id}`, author - 500)
      db.set(`para_${user.id}`, targetuser + 500);
        client.channels.cache.get("705216457101017148").send(`😂 **${message.author.tag}** Adlı kullanıcı **${user.tag}**'ı soycak iken kalkan'a takıldı! ve **${user.tag}** korundu...`)
        return message.reply(`Maalesef! **${user.tag}** Adlı kullanıcı marketten \`1 Günlük Kalkan\` aldığı için onu soyamazsın! (500TL kaybettiniz)`)
      }
    if(db.has(`${user.id}.kalkan`) === false) {
    
      let random = Math.floor(Math.random() * 150) + 1;

      db.set(`para_${message.author.id}`, author + random);

      db.set(`para_${user.id}`, targetuser - random);

      dbs.set(`soygun_${message.author.id}`, Date.now());

      db.set(`${message.author.id}.bıçak_adet`, bıçak - 1)
      
      let embed = new Discord.MessageEmbed()
        .setDescription(
          `${message.author.tag}, **${user.tag}** Soyuldu ve ${random}TL para kaçırdın`
        )
        .setColor("GREEN")
      .setImage("https://i.makeagif.com/media/4-27-2015/aBLrDU.gif")
        .setTimestamp();
      message.channel.send(embed);

      user.send(
        `**${message.author.tag}** adlı kişi tarafından soyuldun ve ${random}TL paran gitti.`
      ).catch(_ => message.channel.send(`**${user.tag}** adlı kullanıcının DMsine mesaj gönderilemedi\ngönderilecek mesaj: \`{message.author.tag} adlı kişi tarafından soyuldun ve ${random}TL paran gitti.\``))
      
       client.channels.cache.get("703155904777814107").send(`**${message.author.tag}**, Adlı kullanıcı \`${user.tag}\` Adlı kullanıcıyı soydu ve ${random}TL kazandı.`)
    }
    }
      if (args[0] === "market") {
        
        let ms = require("parse-ms");

      let timeout = 300000;

      let dbs = require("coders.db");

      let weekly = await dbs.fetch(`marketsoygun_${message.author.id}`);

      if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        let time = ms(timeout - (Date.now() - weekly));

        message.reply(
          `Polisler seni heryerde seni arıyor ortalık temizlenince tekrardan, marketi soyabilirsin. (**${time.minutes}dakika ${time.seconds}saniye** beklemelisin)`
        );
      } else {
       var pistoladet = await db.fetch(`${message.author.id}.pistol_adet`);
        if (!pistoladet) {
          message.reply("**Yanında `Pistol` olmadığı için marketi soyamadın ve Polis seni kıskıvrak yakaladı ve 1000 TL para cezası kesti.**");
           await db.set(`para_${message.author.id}`, para - 1000)
        }
        if (pistoladet) {

          let para = Math.floor(Math.random() * 550) + 1;

          db.add(`para_${message.author.id}`, para);

          db.set(`${message.author.id}.pistol_adet`, pistoladet - 1);

          db.set(`marketsoygun_${message.author.id}`, Date.now());

          let embed = new Discord.MessageEmbed()
            .setDescription(
              `${message.author.tag}, Marketi soydun ve ${para} TL kazandın **burdan uzaklaş polis yaklaşıyor**.`
            )
            .setColor("GREEN")
            .setTimestamp()
          .setImage("https://static.wixstatic.com/media/f9f6e8_dfe88e43dc4044ceb8e2775ca3b17b49~mv2.gif/v1/fit/w_2500,h_1330,al_c/f9f6e8_dfe88e43dc4044ceb8e2775ca3b17b49~mv2.gif");
          message.channel.send(embed);
          client.channels.cache.get("703155904777814107").send(`**${message.author.tag}**, Adlı kullanıcı \`Market\`'i soydu ${para}TL kazandı.`)
        }
      }
        
      }
      
            if (args[0] === "banka") {
        
        let ms = require("parse-ms");

      let timeout = 300000;

      let dbs = require("coders.db");

      let weekly = await dbs.fetch(`bankasoygun_${message.author.id}`);

      if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        let time = ms(timeout - (Date.now() - weekly));

        message.reply(
          `Polisler seni heryerde seni arıyor ortalık temizlenince tekrardan, bankayı soyabilirsin. (**${time.minutes}dakika ${time.seconds}saniye** beklemelisin)`
        );
      } else {
       var ak47adet = await db.fetch(`${message.author.id}.ak47_adet`);
        if (!ak47adet) {
          message.reply("**Yanında `AK-47` olmadığı için marketi soyamadın ve Polis seni kıskıvrak yakaladı ve 1000 TL para cezası kesti.**");
           await db.set(`para_${message.author.id}`, para - 1000)
        }
        if (ak47adet) {

          let para = Math.floor(Math.random() * 1500) + 1;

          db.add(`para_${message.author.id}`, para);

          db.set(`${message.author.id}.ak47_adet`, ak47adet - 1);

          db.set(`bankasoygun_${message.author.id}`, Date.now());

          let embed = new Discord.MessageEmbed()
            .setDescription(
              `${message.author.tag}, Bankayı soydun ve ${para} TL kazandın. Birde rehine :wink: kazandın. **Burdan uzaklaşmalısın polis yaklaşıyor**. `
            )
            .setColor("GREEN")
            .setTimestamp()
          .setImage("https://i.makeagif.com/media/5-09-2017/-_aKCL.gif");
          message.channel.send(embed);
          client.channels.cache.get("703155904777814107").send(`**${message.author.tag}**, Adlı kullanıcı \`Banka\`'yı soydu ${para}TL kazandı.`)
        }
      }
        
      }
  }
  }
};
