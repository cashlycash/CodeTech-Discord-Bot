const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Shows all available bot commands.",
  usage: "[command]",
  run: async (client, message, args) => {
    const prefix = client.config.prefix;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `[\`${name}\`](${client.config.randomlink})`;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new EmbedBuilder()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}
          help ping\``
        )
        .setFooter({
          text: `Requested by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp()
        .setURL(client.config.randomlink)
        .setColor("#FF0000");
      return message.channel.send({
        embeds: [embed],
      });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new EmbedBuilder()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new EmbedBuilder()
        .setTitle("Command Details:")
        .addFields(
          {
            name: "COMMAND:",
            value: command.name
              ? `\`${command.name}\``
              : "No name for this command.",
            inline: true,
          },
          {
            name: "ALIASES:",
            value: command.aliases
              ? `\`${command.aliases.join("` `")}\``
              : "`No aliases for this command.`",
            inline: true,
          },
          {
            name: "USAGE:",
            value: command.usage
              ? `\`${prefix}${command.name} ${command.usage}\``
              : `\`${prefix}${command.name}\``,
            inline: false,
          },
          {
            name: "DESCRIPTION:",
            value: command.description
              ? `\`${command.description}\``
              : "`No description for this command.`",
            inline: true,
          }
        )
        .setFooter({
          text: `Requested by ${message.author.username}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp()
        .setURL(client.config.randomlink)
        .setColor("00FF00");
      return message.channel.send({
        embeds: [embed],
      });
    }
  },
};
