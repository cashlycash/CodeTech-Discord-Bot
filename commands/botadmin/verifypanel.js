const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const owners = ["908554250945183744"];

module.exports = {
  name: "verifypanel",
  aliases: ["vp"],
  description: "Make a panel with button to verify a user",
  run: (client, message, args) => {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
      return;
    }

    const emb = new EmbedBuilder()
      .setTitle("Verify")
      .setColor("#6600ff")
      .setDescription(
        "Click the button bellow to verify and get access to the rest of the server"
      );

    const btn = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setLabel("Verify")
        .setCustomId("verify")
        .setStyle(ButtonStyle.Success)
    );
    message.channel.send({ embeds: [emb], components: [btn] });
    message.delete();
  },
};
