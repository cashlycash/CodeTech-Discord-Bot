const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  id: "tkt",
  run: async (client, interaction) => {
    const emb = new MessageEmbed()
      .setTitle(`Confirmation`)
      .setDescription(
        "Are you sure you wanna open a ticket? This will send make a new channel just for your conversation with the admins.\n**Please don't instantly close your ticket after making.**"
      )
      .setColor("RED");

    const btn = new MessageActionRow().setComponents(
      new MessageButton()
        .setLabel("Continue")
        .setCustomId("tkt:m")
        .setStyle("DANGER")
    );

    interaction.reply({
      embeds: [emb],
      components: [btn],
      ephemeral: true,
    });
  },
};
