module.exports = {
  config: {
    name: "profil2",
    aliases: [],
    help: {
      description: "profili 2'ne bakmak için kullanılır.",
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
    try {
      /*global client*/
      const m = require("moment");
      m.locale("tr");
      const eMbEd = new Discord.MessageEmbed();

      const user =
        message.mentions.users.first() ||
        client.users.cache.get(args[0]) ||
        message.author;

      if (user.bot === true) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `${message.author.username}, Botların profiline bakamazsın!`
          )
          .setColor("RED");
        message.channel.send(embed);
        return;
      }

      let cooldown = 86400000;
var mesaj = ""
      let ms = require("parse-ms");
if(db.has(`${user.id}.kalkan`)== true){
      let weekly = await db.fetch(`${user.id}.kalkan_süre2`)

      if (weekly !== null && cooldown - (Date.now() - weekly) > 0) {
        var time = ms(cooldown - (Date.now() - weekly))
        mesaj = `${time.hours} saat, ${time.minutes} dakika, ${time.seconds} saniye.`
      }
        }else{
          mesaj = "Kalkanı yok!"
        }

        let para = (await db.fetch(`para_${user.id}`)) || 0;
        let xp = (await db.fetch(`puancik_${user.id + message.guild.id}`)) || 0;

        eMbEd.setThumbnail(user.avatarURL({dynamic: true}));
        eMbEd.setColor("RANDOM");
        eMbEd.setTitle(`${user.tag} Adlı kullanıcının profili`);
        eMbEd.addField(
          `Sunucunun tam adı ve kısa adı`,
          `**${message.guild.name}** | **${message.guild.nameAcronym}**`
        );
        eMbEd.addField(
          "Takma Ad:",
          message.guild.member(user).nickname
            ? message.guild.member(user).nickname
            : "Yok",
          true
        );
        eMbEd.addField(`Paran`, `${para + " TL"}`);
        eMbEd.addField(`Toplam XP`, `${xp + " XP"}`);
        eMbEd.addField(
          `Sunucuya Giriş Sırası`,
          `${user.tag} adlı kullanıcı sunucuda ${message.guild.members.cache
            .array()
            .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
            .indexOf(message.guild.member(user)) + 1}/${
            message.guild.memberCount
          }.`
        );
        eMbEd.addField(
          "Hesap Oluşturulma Tarihi:",
          m(user.createdAt)
            .add(3, "hour")
            .format("LLLL"),
          true
        );
        eMbEd.addField(
          "Sunucuya Katılma Tarihi:",
          m(message.guild.member(user).joinedAt)
            .add(3, "hour")
            .format("LLLL"),
          true
        );
        eMbEd.addField(
          "Aktif kalkan süresi",
          mesaj
        );
        eMbEd.addField(
          `Rozetleri`,
          `${(await db.fetch(`${message.author.id}.rozet1_soygunculuk`)) ||
            "Bulunmuyor!"}, ${(await db.fetch(
            `${message.author.id}.rozet2_paralar`
          )) || "Bulunmuyor!"}`
        );

        message.channel.send(eMbEd);
      
    } catch (err) {
      console.warn(err);
    }
  }
};
