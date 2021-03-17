module.exports = {
  config: {
    name: "çalış",
    aliases: [],
    help: {
      description: "bu kodu kullanarak para kazanırsın",
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
    var embed = new Discord.MessageEmbed();
    let dbs = require("coders.db");
    const ms = require("parse-ms");
    let sure = dbs.fetch(`users.${message.author.id}.çalışs`);
    let süre = 300000;
    if (sure !== null && süre - (Date.now() - sure) > 0) {
      var zamanObj = ms(süre - (Date.now() - sure));
      embed.setDescription(
        `${message.author.username} Daha yeni çalıştığın için **${zamanObj.minutes} dakika ${zamanObj.seconds} saniye** beklemelisin!`
      );
      embed.setColor("FF9C00");
      message.channel.send(embed);
    } else {


      var iş = [
        "Madenci",
        "Terzi",
        "Polis",
        "Avukat",
        "Tamirci",
        "Memur",
        "Recep TAyyıP Ersoğan",
        "Kefenci",
        "Tuvaletçi",
        "Komutan",
        "Asker",
        "Aşçı",
        "Artist",
        "Badanacı",
        "Başkan",
        "Berber",
        "Çaycı",
        "Davulcu",
        "Eczacı",
        "Bakıcı",
        "Fırıncı",
        "Gardiyan",
        "Gemici",
        "Hakem",
        "Kaleci",
        "İpçi",
        "Kağıtçı",
        "İtfayeci",
        "Kebapçı",
        "Kasiyer",
        "Kuaför",
        "Madenci",
        "Manken",
        "Muallim",
        "Mühendis"
      ]; //yeter bu kadar
 let çalışmatl = Math.floor(Math.random() * 250) + 1;
      
      let işler = Math.floor(Math.random() * iş.length);
      if (çalışmatl === 0)
        return message.reply(
          `Parayı eve götürürken soyuldun ve hiç para kazanamadın. `   
        );
      let para = await db.fetch(`para_${message.author.id}`);

      let toplam_para = para + çalışmatl
      message.channel.send(
        `${message.author.username} \`${iş[işler]}\` olarak çalıştın ve \`${
          çalışmatl
        } TL\` kazandın, **Artık Cüzdanında** :money_with_wings: ${toplam_para ||
          çalışmatl}TL var`
      );

      db.set(`para_${message.author.id}`, toplam_para);
      dbs.set(`users.${message.author.id}.çalışs`, Date.now());
      client.channels.cache.get("703155843226665050").send(`**${message.author.tag}**, Adlı kullanıcı \`${iş[işler]}\` işini yaparak \`${çalışmatl}\`TL kazandı.`)
    }
  }
};
