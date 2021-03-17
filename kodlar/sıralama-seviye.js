module.exports = {
config: {
    name: "seviye-sıralama",
  aliases: [],
  help: {
    description: "Seviye sisteminin sunucudaki liderlik tablosunu gösterir",
    usage: "",
    category: "Ekonomi",
  },
  serverOnly: false,
  ownerOnly: false,
  permissions: {
    bot: [],
    user: []
  }
},
run: async function({ message, Discord, db, args, lineUp, settings }) { /*global client*/
  let msg = message;
        const sorted = msg.guild.members.cache.filter(u => !u.bot).array().sort((a, b) => { return (db.fetch(`xpsira_${b.user.id + msg.guild.id}`) ? db.fetch(`xpsira_${b.user.id + msg.guild.id}`) : 0) - (db.fetch(`xpsira_${a.user.id + msg.guild.id}`) ? db.fetch(`xpsira_${a.user.id + msg.guild.id}`) : 0) });
        const top10 = sorted.splice(0, 10)
        const mappedLevel = top10.filter(o => !o.bot).map(s => db.fetch(`seviye_${s.user.id + msg.guild.id}`) || 0)
         const mappedPuan = top10.filter(o => !o.bot).map(s => db.fetch(`puancik_${s.user.id + msg.guild.id}`) || 0)
        const mappedName = top10.filter(o => !o.bot).map(s => s.user.tag);
        const mappedID = top10.filter(o => !o.bot).map(s => s.user.id);
        var str = ''
        for(var i = 0; i < 10; i++) {

            var lvl = mappedLevel[i]
            var puan = mappedPuan[i]
       let nxtLvlXp = lvl * 300;
          
            if(msg.author.id === mappedID[i]) {
                str += `[${i + 1}] > ${mappedName[i]}\n  Level: ${lvl} Xp: ${puan}\n\n`
            }
          
            if(msg.author.id !== mappedID[i]) {
                str += `[${i + 1}] > ${mappedName[i]}\n  Level: ${lvl} Xp: ${puan}\n\n`
            }
        }
        let wEmbed = new Discord.MessageEmbed()
        .setTitle(`Sıralama sistemi`)
        .setDescription(`${str}`)
        .setColor("RED")
        msg.channel.send(wEmbed)

}
}