module.exports = {
  id: "dp:reconnect",
  run: (client, interaction) => {
    var owners = client.config.botadmins;
    if (!owners.includes(interaction.member.user.id)) {
      return interaction.reply({ content: "Limited To The Bot Admins Only!" , ephemeral: true });
    }
    const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Reconnecting to the Discord API...")
    
    const back = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("dp:back")
          .setLabel("Back")
          .setStyle("DANGER")
      );

    interaction.reply({ embeds: [embed], ephemeral: true })
    setTimeout(() => {
      client.destroy();
      client.login(process.env.TOKEN);
    }, 1000);
  },
};