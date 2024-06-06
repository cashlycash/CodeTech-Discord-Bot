const { Client, Message, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "steal",
  aliases: ["addemoji"],
  description: "Steal emoji from another server",
  usage: "<emoji> <name>",
  UserPerms: ["MANAGE_EMOJIS_AND_STICKERS"],
  run: async (client, message, args, Discord) => {
    if (args.length == 0) {
      return message.reply(
        `__Format : __\`${client.config.prefix}steal emoji new_name\``
      );
    }
    try {
      const emoji = args[0];
      const emojiId = emoji.match(/([0-9]+)/)[0];
      if (!emojiId) return message.reply("Emoji ID not found");

      message.guild.emojis
        .create({
          name: args[1],
          attachment: `https://cdn.discordapp.com/emojis/${emojiId}`,
        })
        .then((newEmoji) => {
          message.react(newEmoji);
        })
        .catch((err) => {
          message.reply("Wrong Format or a bug");
          message.react("👎");
        });
    } catch (e) {
      message.react("👎");
      message.reply("Wrong Format or a bug");
    }
  },
};
