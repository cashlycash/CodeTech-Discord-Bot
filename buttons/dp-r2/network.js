module.exports = {
  id: "dp:network",
  run: (client, interaction) => {
    const {
      EmbedBuilder,
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
    } = require("discord.js");

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Network Status")
      .setDescription(
        `**Webhook Ping:** ${client.ws.ping}ms\n**Latency:** ${
          interaction.createdTimestamp - Date.now()
        }ms`
      )
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("dp:reconnect")
        .setLabel("Reconnect Webhook")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("dp:network")
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
