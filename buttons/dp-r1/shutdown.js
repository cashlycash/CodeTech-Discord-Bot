module.exports = {
  id: "dp:shutdown",
  run: (client, interaction) => {
    var owners = client.config.botadmins;
    if (!owners.includes(message.author.id)) {
      return interaction.reply({ content: "Limited To The Bot Admins Only!" , ephemeral: true });
    }
    const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Shutting down the bot...")

    interaction.reply({ embeds: [embed], ephemeral: true })

    
    const dat = {
      activities: [{
        name: "Shutting down...",
        type: "PLAYING",
      }],
      status: 'dnd',
    };
    client.user.setPresence(dat);

    setTimeout(async () => {
      process.exit();
    }, 1000);
  },
};