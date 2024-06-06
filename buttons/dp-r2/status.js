module.exports = {
  id: "dp:status",
  run: (client, interaction) => {
    const {
      EmbedBuilder,
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
    } = require("discord.js");
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Hosting Status")
      .setDescription("Status of the bot's hosting.")
      .addFields(
        {
          name: "CPU",
          value: `${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`,
          inline: true,
        },
        {
          name: "RAM",
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}%`,
          inline: true,
        },
        {
          name: "Uptime",
          value: `${Math.floor(process.uptime() / 3600)} hours, ${Math.floor(
            process.uptime() / 60
          )} minutes, and ${Math.floor(process.uptime() % 60)} seconds`,
        }
      )
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("dp:shutdown")
        .setLabel("Shutdown")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("dp:status")
        .setLabel("Refresh")
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
