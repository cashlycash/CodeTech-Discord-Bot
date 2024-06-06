module.exports = {
  id: "dp:technical",
  run: (client, interaction) => {
    const {
      EmbedBuilder,
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
    } = require("discord.js");
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Technical Information")
      .addFields(
        { name: "OS", value: process.platform, inline: true },
        { name: "CPU", value: process.arch, inline: true },
        { name: "Node.js", value: process.version, inline: true },
        {
          name: "Discord.js",
          value: require("discord.js").version,
          inline: true,
        }
      )
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("dp:shutdown")
        .setLabel("Shutdown")
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
