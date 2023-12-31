const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const Nuggies = require("nuggies");

module.exports = {
  name: "reactrolesplus",
  aliases: ["rrp"],
  description: "Create a reaction role menu with advanced options",
  UserPerms: ["ADMINISTRATOR"],
  run: async (client, message, args, Discord) => {
    var owners = client.config.botadmins;
    if (!owners.includes(message.author.id)) {
      return message.channel.send("Limited To The Bot Admins Only!");
    }

    const roles = [];
    const msgs = [];

    message.channel.send(
      "Send messages in `roleID color label emoji` syntax! Once finished say `done`."
    );

    const filter = (m) => m.author.id == message.author.id;
    const collector = message.channel.createMessageCollector(filter, {
      max: Infinity,
    });

    collector.on("collect", async (msg) => {
      if (msg.author.bot) return;
      if (!msg.content) return;
      if (msg.content.toLowerCase() == "done") return collector.stop("DONE");
      const colors = ["SUCCESS", "PRIMARY", "DANGER", "SECONDARY"];
      if (
        !msg.content.split(" ")[0].match(/[0-9]{18}/g) ||
        !colors.includes(msg.content.split(" ")[1])
      ) {
        message.channel.send("Invalid syntax").then((m) => {
          setTimeout(() => {
            m.delete();
            msg.delete();
          }, 1500);
        });
        return 
      }

      const role = msg.content.split(" ")[0];
      if (!role) {
        message.channel.send("Invalid role").then((m) => {
          setTimeout(() => {
            m.delete();
            msg.delete();
          }, 1500);
        });
        return 
      }

      const color = colors.find((color) => color == msg.content.split(" ")[1]);
      if (!color) {
        message.channel.send("Invalid color").then((m) => {
          setTimeout(() => {
            m.delete();
            msg.delete();
          }, 1500);
        });
        return
      }

      const label = msg.content
        .split(" ")
        .slice(2, msg.content.split(" ").length - 1)
        .join(" ");

      const reaction = await msg
        .react(
          msg.content
            .split(" ")
            .slice(msg.content.split(" ").length - 1)
            .join(" ")
        )
        .catch(console.log);

      const final = {
        role,
        color,
        label,
        emoji: reaction ? reaction.emoji.id || reaction.emoji.name : null,
      };
      roles.push(final);
      msgs.push(msg);
    });

    collector.on("end", async (msgs, reason) => {
      if (reason == "DONE") {
        msgs.forEach((msg) => msg.delete());
        const embed = new MessageEmbed()
          .setTitle(args.join(" "))
          .setDescription(
            "Click on the buttons to get the specific role or vice-versa"
          )
          .setColor("BLUE")
          .setTimestamp();
        const buttons = [];
        const rows = [];
        for (const buttonObject of roles) {
          const button = new MessageButton()
            .setStyle(buttonObject.color)
            .setLabel(buttonObject.label)
            .setCustomId(`br:${buttonObject.role}`);
          buttonObject.emoji ? button.setEmoji(buttonObject.emoji) : null;
          buttons.push(button);
        }
        for (let i = 0; i < Math.ceil(roles.length / 5); i++) {
          rows.push(new MessageActionRow());
        }
        rows.forEach((row, i) => {
          row.addComponents(buttons.slice(0 + i * 5, 5 + i * 5));
        });

        message.channel.send({ embeds: [embed], components: rows });
      }
    });
  },
};
