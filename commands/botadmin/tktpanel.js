const {
  ActionRowBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "tktpanel",
  aliases: ["tp"],
  description: "Make a ticket panel",
  run: async (client, message) => {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return;
    }

    ch = message.channel;

    const emb = new EmbedBuilder()
      .setTitle("New Ticket")
      .setDescription("Click on the button below to create a ticket")
      .addFields({
        name: "NOTE!",
        value: "**`Spaming of ticket will result in strict action`**",
      })
      .setColor("Blurple");

    const btn = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setLabel("CREATE TICKET")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🎫")
        .setCustomId("tkt")
    );
    ch.send({ embeds: [emb], components: [btn] });
    message.delete();
  },
};
