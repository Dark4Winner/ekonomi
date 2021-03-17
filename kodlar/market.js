module.exports = {
  config: {
    name: "market",
    aliases: [],
    help: {
      description: "Marketi görüntülersiniz ve birşeyler satın alırsınız",
      usage: "",
      category: "Ekonomi"
    },
    serverOnly: false,
    ownerOnly: false,
    permissions: {
      bot: [],
      user: []
    }
  },
  run: async function({ message, Discord, db, args, lineUp, settings }) {
    /*global client*/
    let dbs = require("coders.db");
  /*  var polisler = await dbs.has(`soygun_${message.author.id}`);

    if (polisler === true) {
    message.reply(
        `Polisler \`Marketi\` denetliyor burdan uzaklaşman lazım. \n**Not: polisler gidince markete girebilirsin**`
      );
      
      db.set(`soygun_${message.author.id}`, 1);
    } return;
*/
    
    let cooldown = 20000;

    let ms = require("parse-ms");

    let weekly = await dbs.fetch(`market_${message.author.id}`);

    if (weekly !== null && cooldown - (Date.now() - weekly) > 0) {
      let time = ms(cooldown - (Date.now() - weekly));

      message.reply(
        `Taksidi yeni bitti **${time.seconds} saniye** beklemelisin`
      );
    } else {
      let para = (await db.fetch(`para_${message.author.id}`)) || 0;

      let eşyalar = ["cips", "ekmek", "süt", "su", "votka","kalkan"];
      if (!eşyalar.includes(args[0]))
        return message.channel.send(
          lineUp`Markette Olan Eşyalar: \`${eşyalar}\``
        );

      if (args[0] === "cips") {
        if (para < 10) {
          message.reply(
            "`Cips` almak için 10₺ ye ihtiyacın var. Senin paran: **" +
              para +
              "**"
          );
        }

        if (para > 10) {
          message.reply(
            `Marketten **1** adet \`Cips\` aldın. Şuanki paran: ${para - 10}`
          );
          await db.add(`${message.author.id}.cips_adet`, 1);

          await db.set(`para_${message.author.id}`, para - 10);
          dbs.set(`market_${message.author.id}`, Date.now());
          client.channels.cache.get("703156025863307264").send(`**${message.author.tag}**, Adlı kullanıcı marketten \`Cips\` satın aldı. Geriye **${para - 10}**TL'si kaldı.`)
        }
      }
      if (args[0] === "ekmek") {
        if (para < 60) {
          message.reply(
            "`Ekmek` almak için 60₺ ye ihtiyacın var. Senin paran: **" +
              para +
              "**"
          );
        }

        if (para > 60) {
          message.reply(
            `Marketten **1** adet \`Ekmek\` aldın. Şuanki paran: ${para - 60}`
          );
          await db.add(`${message.author.id}.ekmek_adet`, 1);
          dbs.set(`market_${message.author.id}`, Date.now());
          await db.set(`para_${message.author.id}`, para - 60);
          client.channels.cache.get("703156025863307264").send(`**${message.author.tag}**, Adlı kullanıcı marketten \`Ekmek\` satın aldı. Geriye **${para - 60}**TL'si kaldı.`)
        }
      }

      if (args[0] === "süt") {
        if (para < 70) {
          message.reply(
            "`Süt` almak için 70₺ ye ihtiyacın var. Senin paran: **" +
              para +
              "**"
          );
        }

        if (para > 70) {
          message.reply(
            `Marketten **1** adet \`Süt\` aldın. Şuanki paran: ${para - 70}`
          );
          await db.add(`${message.author.id}.süt_adet`, 1);
          dbs.set(`market_${message.author.id}`, Date.now());
          await db.set(`para_${message.author.id}`, para - 70);
          client.channels.cache.get("703156025863307264").send(`**${message.author.tag}**, Adlı kullanıcı marketten \`Süt\` satın aldı. Geriye **${para - 70}**TL'si kaldı.`)
        }
      }

      if (args[0] === "su") {
        if (para < 1000) {
          message.reply(
            "`Su` almak için 1500₺ TLye ihtiyacın var. Senin paran: **" +
              para +
              "**"
          );
        }

        if (para > 1000) {
          message.reply(
            `Marketten **1** adet \`Su\` aldın. Şuanki paran: ${para - 1000} `
          );
          await db.add(`${message.author.id}.su_adet`, 1);
          dbs.set(`market_${message.author.id}`, Date.now());
          await db.set(`para_${message.author.id}`, para - 1000);
          client.channels.cache.get("703156025863307264").send(`**${message.author.tag}**, Adlı kullanıcı marketten \`Su\` satın aldı. Geriye **${para - 1000}**TL'si kaldı.`)
        }
      }

      if (args[0] === "votka") {
        if (para < 90000) {
          message.reply(
            "`Votka` almak için 90.000 ₺'ye ihtiyacın var. Senin paran: **" +
              para +
              "**"
          );
        }

        if (para > 90000) {
          message.reply(
            `Marketten **1** adet \`(70)lik Votka\` aldın. Şuanki paran: ${para -
              90000} `
          );
          await db.add(`${message.author.id}.votka_adet`, 1);
          await db.set(`para_${message.author.id}`, para - 90000);
          dbs.set(`market_${message.author.id}`, Date.now());
          
          client.channels.cache.get("703156025863307264").send(`**${message.author.tag}**, Adlı kullanıcı marketten \`70lik votka\` satın aldı. Geriye **${para - 90000}**TL'si kaldı.`)
        }
      }
      
            if (args[0] === "kalkan") {
        if (para < 3500) {
        if(await db.has(`${message.author.id}.kalkan`) === true) return message.reply(`**Zaten 1 adet kalkanın bulunuyor!** `)
          message.reply(
            "`1 Günlük Kalkan` almak için 3500 ₺'ye ihtiyacın var. Senin paran: **" +
              para +
              "**"
          );
        }

        if (para > 3500) {
          if(await db.has(`${message.author.id}.kalkan`) === true) return message.reply(`**Zaten 1 adet kalkanın bulunuyor!** `)
          message.reply(
            `Marketten **1** adet \`1 Günlük Kalkan\` aldın. Şuanki paran: ${para -
              3500} `
          );
   db.set(`${message.author.id}.kalkan`, true);
   db.set(`para_${message.author.id}`, para -3500);
          db.set(`${message.author.id}.kalkan_süre`, 86400000)// 1 gün
          db.set(`${message.author.id}.kalkan_süre2`, Date.now())
          dbs.set(`market_${message.author.id}`, Date.now());
          
          client.channels.cache.get("703156025863307264").send(`**${message.author.tag}**, Adlı kullanıcı marketten \`1 Günlük Kalkan\` satın aldı. Geriye **${para - 3500}**TL'si kaldı.`)
        }
      }
      
    }
  }
};
