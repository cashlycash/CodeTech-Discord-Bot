module.exports = {
  id: "dp:network",
  run: (client, interaction) => {
    const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Network Status")
      .setDescription(
        `**Webhook Ping:** ${client.ws.ping}ms\n**Latency:** ${
          interaction.createdTimestamp - Date.now() 
        }ms`
      )
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("dp:reconnect")
        .setLabel("Reconnect Webhook")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("dp:network")
        .setLabel("Refresh")
        .setStyle("PRIMARY")
    );

    const back = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("dp:back")
        .setLabel("Back")
        .setStyle("DANGER")
    );

    interaction.update({ embeds: [embed], components: [row, back] });
  },
};
