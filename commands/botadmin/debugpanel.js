const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "debugpanel",
  aliases: ["dp"],
  description: "Self care for the bot.",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle("Debug Panel")
      .setDescription("Self care panel for the bot.")
      .setColor("BLURPLE");
    const row1 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("dp:row1a")
          .setLabel("Actions")
          .setStyle("SECONDARY")
          .setDisabled(true)
      )
      .addComponents(
        new MessageButton()
          .setCustomId("dp:shutdown")
          .setLabel("Shutdown Process")
          .setStyle("DANGER")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("dp:reconnect")
          .setLabel("Reconnect Webhook")
          .setStyle("DANGER")
      );
    const row2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("dp:row1b")
          .setLabel("Actions")
          .setStyle("SECONDARY")
          .setDisabled(true)
      )
      .addComponents(
        new MessageButton()
          .setCustomId("dp:reregister")
          .setLabel("Re-register Commands")
          .setStyle("DANGER")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("dp:reloadenb")
          .setLabel("Reload All Buttons")
          .setStyle("DANGER")
      );
    const row3 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("dp:row2a")
          .setLabel("‎ Status ‎")
          .setStyle("SECONDARY")
          .setDisabled(true)
      )
      .addComponents(
        new MessageButton()
          .setCustomId("dp:status")
          .setLabel("Hosting Status")
          .setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("dp:network")
          .setLabel("Network Information")
          .setStyle("PRIMARY")
      );

    const row4 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("dp:row2b")
          .setLabel("‎ Status ‎")
          .setStyle("SECONDARY")
          .setDisabled(true)
      )
      .addComponents(
        new MessageButton()
          .setCustomId("dp:handeled")
          .setLabel("Handeled Subjects")
          .setStyle("PRIMARY")
      )
      .addComponents(
        new MessageButton()
          .setCustomId("dp:technical")
          .setLabel("Technical Specs")
          .setStyle("PRIMARY")
      );

    message.channel.send({
      embeds: [embed],
      components: [row1, row2, row3, row4],
    });
  },
};
