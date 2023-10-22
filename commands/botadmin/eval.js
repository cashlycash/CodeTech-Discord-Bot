const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  aliases: ["e"],
  description: "Evaluate a awaited JS code on the bot",
  usage: "<code in JS code block>",
  run: async (client, message, args) => {
    var owners = client.config.botadmins;
    if (!owners.includes(message.author.id)) {
      return message.channel.send("Limited To The Bot Admins Only!");
    }
    try {
      const code = args.join(" ").slice(6).slice(0, -3);
      if (!code) {
        return message.channel.send("What do you want to evaluate?");
      }

      let evaled = await eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      let embed = new MessageEmbed()
        .setAuthor("Eval", message.author.avatarURL())
        .addField("Input", `\`\`\`js\n${code}\`\`\``)
        .addField("Output", `\`\`\`${evaled}\`\`\``)
        .setColor("GREEN");

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      const code = args.join(" ").slice(6).slice(0, -3);
      let embed = new MessageEmbed()
        .setAuthor("Eval", message.author.avatarURL())
        .addField("Input", `\`\`\`js\n${code}\`\`\``)
        .addField("Error", `\`\`\`${err}\`\`\``)
        .setColor("RED");
      message.channel.send({ embeds: [embed] });
    }
  },
};
