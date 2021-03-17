module.exports = {
  config: {
    name: "sıralama",
    aliases: [],
    help: {
      description: "en çok para listesine bakar",
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
   return message.reply(`:x: Bu komut geçiçi hasar nedeniyle şuanda kapalıdır!`);

    const sortBy = require('lodash/sortBy');{
  function startsWith(db, str, options = { sort: undefined }) {
    var arr = [];
    for (const el of db.all()) {
        if (el.ID === null || !el.ID.startsWith(str)) continue;
        const { ID, data } = el;
        arr.push({
            ID: el.ID,
            data: el.data
        });
    }
    if (typeof options.sort === 'string') {
        if (options.sort.startsWith('.')) options.sort = options.sort.slice(1);
        options.sort = options.sort.split('.');
        arr = sortBy(arr, options.sort);
        arr = arr.reverse();
    }
    return arr;
  }}
      
    
    let money = await db.startsWith(`para_${message.guild.id}`, {
      sort: ".data"
    });
    let content = "";

    for (let i = 0; i < money.length; i++) {
      let user = client.users.get(money[i].ID.split("_")[2]).user.username;

      content += `${i + 1}. ${user} ~ ${money[i].data} TL\n`;
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.guild.name} - Para Sıralaması!`,
        message.guild.iconURL()
      )
      .setDescription(content)
      .setColor(0x51267);
  }
};
