const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "botinfo",
  description: "Information about the bot",
  run: async (client, interaction) => {
    const emb = new EmbedBuilder()
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
        }
      )
      .setColor("Blurple")
      .setTimestamp()
      .setFooter({
        text: "Made with love by CashlyCash",
        iconURL: client.user.avatarURL(),
      });

    const row = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setLabel("Chat With Developer")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.com/users/1056591132739506248"),
      new ButtonBuilder()
        .setLabel("GitHub Repository")
        .setStyle(ButtonStyle.Link)
        .setURL("https://github.com/cashlycash/CodeTech-Discord-Bot")
    );
    interaction.followUp({ embeds: [emb], components: [row] });
  },
};
