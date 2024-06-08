const { PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "say",
  aliases: ["speak"],
  description: "Make the bot say something",
  usage: "[channel] <message>",
  UserPerms: [PermissionFlagsBits.ManageMessages],
  run: async (client, message, args) => {
    var channel = message.mentions.channels.first();
    if (!channel) channel = message.channel;

    var msg =
      message.channel.id == channel.id
        ? args.join(" ")
        : args.slice(1).join(" ");
    if (!msg) return message.reply("Please specify a message");

    channel.send(msg);
    message.delete();
  },
};
