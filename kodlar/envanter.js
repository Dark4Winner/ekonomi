module.exports = {
  config: {
    name: "envanter",
    aliases: ["env"],
    help: {
      description: "envanterdenki eşyalarını gösterir",
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

    let sütadet = (await db.fetch(`${message.author.id}.süt_adet`)) || 0;
    let süt = (await db.fetch(`${message.author.id}.süt_1`)) || "var";

    let ekmekadet = (await db.fetch(`${message.author.id}.ekmek_adet`)) || 0;
    let ekmek = (await db.fetch(`${message.author.id}.ekmek_1`)) || "var";

    let cipsadet = (await db.fetch(`${message.author.id}.cips_adet`)) || 0;
    let cips = (await db.fetch(`${message.author.id}.cips_1`)) || "var";

    let suadet = (await db.fetch(`${message.author.id}.su_adet`)) || 0;
    let su = (await db.fetch(`${message.author.id}.su_1`)) || "var";

        let bıçakadet = (await db.fetch(`${message.author.id}.bıçak_adet`)) || 0;
    let bıçak = (await db.fetch(`${message.author.id}.bıçak_1`)) || "var";
    
    let pistoladet = (await db.fetch(`${message.author.id}.pistol_adet`)) || 0;
    let pistol = (await db.fetch(`${message.author.id}.pistol_1`)) || "var";

    let uziadet = (await db.fetch(`${message.author.id}.uzi_adet`)) || 0;
    let uzi = (await db.fetch(`${message.author.id}.uzi_1`)) || "var";

    let ak47adet = (await db.fetch(`${message.author.id}.ak47_adet`)) || 0;
    let ak47 = (await db.fetch(`${message.author.id}.ak47_1`)) || "var";

    let str = `**${sütadet}** Adet süt ${süt} \n**${ekmekadet}** Adet ekmek ${ekmek} \n**${cipsadet}** Adet cips ${cips} \n**${suadet}** Adet su ${su}\n **${bıçakadet}** Adet Bıçak ${bıçak}\n**${pistoladet}** Adet Pistol ${pistol}\n**${uziadet}** Adet Uzi ${uzi}\n **${ak47adet}** Adet AK-47 ${ak47}\n\n **Markete gitmek için, \`-market\` yaz.** \n**Marketten aldığınız eşyaları kullanmak için** \`-kullan <eşya_adı>\` **yazarak kullanabilirsin**.`;

    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag} adlı kullanıcının envanteri`)
      .setColor("RANDOM")
      .setDescription(lineUp`${str != "" ? ` ${str}` : ""}`)
      .setThumbnail(message.author.avatarURL())
      .setFooter(message.author.tag, message.author.avatarURL())
      .setTimestamp();

    message.channel.send(embed);
  }
};
