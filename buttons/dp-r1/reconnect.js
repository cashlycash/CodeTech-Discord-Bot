module.exports = {
  id: "dp:reconnect",
  run: (client, interaction) => {
    var owners = client.config.botadmins;
    if (!owners.includes(interaction.member.user.id)) {
      return interaction.reply({
        content: "Limited To The Bot Admins Only!",
        ephemeral: true,
      });
    }
    const {
      EmbedBuilder,
      ActionRowBuilder,
      ButtonBuilder,
      ButtonStyle,
    } = require("discord.js");
    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle("Reconnecting to the Discord API...");

    const back = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("dp:back")
        .setLabel("Back")
        .setStyle(ButtonStyle.Danger)
    );

    interaction.reply({ embeds: [embed], ephemeral: true });
    setTimeout(() => {
      client.destroy();
      client.login(process.env.TOKEN);
    }, 1000);
  },
};
