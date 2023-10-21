const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "botinfo",
  description: "Info about the bot",
  run: async (client, interaction) => {
    const emb = new MessageEmbed()
      .setTitle("Bot info")
      .setDescription("Here is some information about me!")
      .addFields(
        {
          name: "Developer",
          value: "CashlyCash (<@!1056591132739506248>)",
          inline: true,
        },
        {
          name: "GitHub Repository",
          value: "https://github.com/cashlycash/CodeTech-Discord-Bot",
          inline: true,
        },
        {
          name: "First version launched",
          value: "<t:1659467762:R>",
          inline: true,
        },
        {
          name: "Last updated",
          value: "<t:1697910869:R>",
          inline: true,
        },
      )
      .setColor("BLURPLE")
      .setTimestamp()
      .setFooter({
        text: "Made with love by CashlyCash",
        iconURL: client.user.avatarURL(),
      });

    const row = new MessageActionRow().setComponents(
      new MessageButton()
        .setLabel("Chat With Developer")
        .setStyle("LINK")
        .setURL(
          "https://discord.com/users/1056591132739506248"
        ),
      new MessageButton()
        .setLabel("GitHub Repository")
        .setStyle("LINK")
        .setURL(
          "https://github.com/cashlycash/CodeTech-Discord-Bot"
        ),
    );
    interaction.followUp({ embeds: [emb], components: [row] });
  },
};
