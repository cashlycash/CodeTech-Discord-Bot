module.exports = {
  id: "dp:back",
  run: (client, interaction) => {
    const {
      EmbedBuilder,
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
    } = require("discord.js");

    const embed = new EmbedBuilder()
      .setTitle("Debug Panel")
      .setDescription("Self care panel for the bot.")
      .setColor("Blurple");
    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:row1a")
          .setLabel("Actions")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:shutdown")
          .setLabel("Shutdown Process")
          .setStyle(ButtonStyle.Danger)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:reconnect")
          .setLabel("Reconnect Webhook")
          .setStyle(ButtonStyle.Danger)
      );
    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:row1b")
          .setLabel("Actions")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:reregister")
          .setLabel("Re-register Commands")
          .setStyle(ButtonStyle.Danger)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:reloadenb")
          .setLabel("Reload All Buttons")
          .setStyle(ButtonStyle.Danger)
      );
    const row3 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:row2a")
          .setLabel("‎ Status ‎")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:status")
          .setLabel("Hosting Status")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:network")
          .setLabel("Network Information")
          .setStyle(ButtonStyle.Primary)
      );

    const row4 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:row2b")
          .setLabel("‎ Status ‎")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:handeled")
          .setLabel("Handeled Subjects")
          .setStyle(ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId("dp:technical")
          .setLabel("Technical Specs")
          .setStyle(ButtonStyle.Primary)
      );

    interaction.update({
      embeds: [embed],
      components: [row1, row2, row3, row4],
    });
  },
};
