module.exports = {
  id: "dp:shutdown",
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
      .setTitle("Shutting down the bot...");

    interaction.reply({ embeds: [embed], ephemeral: true });

    const dat = {
      activities: [
        {
          name: "Shutting down...",
          type: "PLAYING",
        },
      ],
      status: "dnd",
    };
    client.user.setPresence(dat);

    setTimeout(async () => {
      process.exit();
    }, 1000);
  },
};
