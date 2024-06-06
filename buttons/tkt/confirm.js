const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

module.exports = {
  id: "tkt",
  run: async (client, interaction) => {
    const emb = new EmbedBuilder()
      .setTitle(`Confirmation`)
      .setDescription(
        "Are you sure you wanna open a ticket? This will send make a new channel just for your conversation with the admins.\n**Please don't instantly close your ticket after making.**"
      )
      .setColor("Red");

    const btn = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setLabel("Continue")
        .setCustomId("tkt:m")
        .setStyle(ButtonStyle.Danger)
    );

    interaction.reply({
      embeds: [emb],
      components: [btn],
      ephemeral: true,
    });
  },
};
