const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  Client,
  ButtonInteraction,
} = require("discord.js");

module.exports = {
  id: "verify",
  /**
   *
   * @param {Client} client
   * @param {ButtonInteraction} interaction
   */
  run: (client, interaction) => {
    const modal = new ModalBuilder()
      .setCustomId("verify")
      .setTitle(`Enter the info below`)
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("name")
            .setLabel("Name")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Write your name here")
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("class")
            .setLabel("Class")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Write your class here (eg: 6, 8, 12)")
            .setRequired(true)
        ),
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId("sec")
            .setLabel("Section")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Write your section here (eg: A, B, E)")
            .setRequired(true)
        )
      );

    interaction.showModal(modal);
  },
};
