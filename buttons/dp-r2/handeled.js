module.exports = {
  id: "dp:handeled",
  run: (client, interaction) => {
    const {
      EmbedBuilder,
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
    } = require("discord.js");

    console.log(client.slashCommands.size);
    console.log(client.commands.size);
    console.log(client.btns.size);

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Handeled Information")
      .addFields(
        {
          name: "Slash Commands",
          value: `\`${client.slashCommands.size}\``,
          inline: true,
        },
        {
          name: "Commands",
          value: `\`${client.commands.size}\``,
          inline: true,
        },
        { name: "Buttons", value: `\`${client.btns.size}\``, inline: true }
      )
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("dp:reregister")
        .setLabel("Re-register Commands")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("dp:reloadenb")
        .setLabel("Reload All Buttons")
        .setStyle(ButtonStyle.Primary)
    );

    const back = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("dp:back")
        .setLabel("Back")
        .setStyle(ButtonStyle.Danger)
    );

    interaction.update({ embeds: [embed], components: [row, back] });
  },
};
