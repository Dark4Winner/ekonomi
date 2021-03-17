module.exports = {
  config: {
    name: "eval",
    aliases: [],
    help: {
      description: "Kod çalıştırır.",
      usage: "-eval <eval>",
      category: "Geliştirici"
    },
    serverOnly: false,
    ownerOnly: true,
    accountOnly: false,
    permissions: {
      bot: [],
      user: []
    }
  },

  run: async function({ message, Discord, db, args, lineUp, settings }) {
    let code = args.join(" ");
    async function clean(text) {
      if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 0 });
      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
      return text;
    }

    try {
      let start = process.hrtime();
      let evaled = await clean(await eval(await code));
      let end = process.hrtime(start);
      message.channel.send(
        `${end[0] ? end[0] + " saniyede / " : ""}${end[1] /
          1000000} milisaniyede çalıştırıldı.\`\`\`js\n` +
          evaled +
          "```",
        { split: true }
      );
    } catch (err) {
      message.channel.send(err, { code: "js", split: true });
    }
  }
};
