module.exports = {
  id: "dp:status",
  run: (client, interaction) => {
    const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Hosting Status")
      .setDescription("Status of the bot's hosting.")
      .addField("CPU", `${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`, true)
      .addField("RAM", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, true)
      .addField("Uptime", `${Math.floor(process.uptime() / 3600)} hours, ${Math.floor(process.uptime() / 60)} minutes, and ${Math.floor(process.uptime() % 60)} seconds`)
      .setTimestamp();

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("dp:shutdown")
          .setLabel("Shutdown")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("dp:status")
          .setLabel("Refresh")
          .setStyle("PRIMARY")
      );

    const back = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("dp:back")
          .setLabel("Back")
          .setStyle("DANGER")
      );

    interaction.update({ embeds: [embed], components: [row, back] });
  },
};