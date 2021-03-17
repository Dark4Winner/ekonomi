module.exports = {
  config: {
    name: "kullan",
    aliases: [],
    help: {
      description: "marketten aldığınız eşyaları kullanırsınız",
      usage: "",
      category: "Genel"
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


    let eşyalar = ["cips", "ekmek", "süt", "su"];
    if (!eşyalar.includes(args[0]))
      return message.channel.send(
        lineUp`Kullanılmaya Hazır Eşyalar: \`${eşyalar}\``
      );

    if (args[0] === "ekmek") {
      let ekmekadet = await db.fetch(`${message.author.id}.ekmek_adet`);

      if (!ekmekadet) return message.reply(`Envanterinde Hiç \`Ekmek\` Yok.`);

      let min = 50;
      let max = 150;
      let random = Math.round(Math.random() * (max - min)) + min;

      message.channel.send(
        `\`Ekmek\` adlı eşyayı başarıyla kullandınız ve ${random} XP kazandınız`
      );
      db.subtract(`${message.author.id}.ekmek_adet`, 1);
      db.add(`xp_${message.author.id}`, random);
    }

    if (args[0] === "süt") {
      let sütadet = await db.fetch(`${message.author.id}.süt_adet`);

      if (!sütadet) return message.reply(`Envanterinde Hiç \`Süt\` Yok.`);

      let min = 50;
      let max = 250;
      let random = Math.round(Math.random() * (max - min)) + min;

      message.channel.send(
        `\`Süt\` adlı eşyayı başarıyla kullandınız ve ${random} XP kazandınız`
      );
      db.subtract(`${message.author.id}.süt_adet`, 1);
      db.add(`xp_${message.author.id}`, random);
    }

    if (args[0] === "cips") {
      let cipsadet = await db.fetch(`${message.author.id}.cips_adet`);

      if (!cipsadet) return message.reply(`Envanterinde Hiç \`Cips\` Yok.`);

      let min = 10;
      let max = 50;
      let random = Math.round(Math.random() * (max - min)) + min;

      message.channel.send(
        `\`Cips\` adlı eşyayı başarıyla kullandınız ve ${random} XP kazandınız`
      );
      db.subtract(`${message.author.id}.cips_adet`, 1);
      db.add(`xp_${message.author.id}`, random);
    }

    if (args[0] === "su") {
      let ekmekadet = await db.fetch(`${message.author.id}.su_adet`);

      if (!ekmekadet) return message.reply(`Envanterinde Hiç \`Su\` Yok.`);

      let min = 90;
      let max = 500;
      let random = Math.round(Math.random() * (max - min)) + min;

      message.channel.send(
        `\`Su\` adlı eşyayı başarıyla kullandınız ve ${random} XP kazandınız`
      );
      db.subtract(`${message.author.id}.su_adet`, 1);
      db.add(`xp_${message.author.id}`, random);
    }
  }
};
