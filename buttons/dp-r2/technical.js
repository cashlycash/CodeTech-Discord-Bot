module.exports = {
  id: "dp:technical",
  run: (client, interaction) => {
    const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Technical Information")
      .addField("OS", process.platform, true)
      .addField("CPU", process.arch, true)
      .addField("Node.js", process.version, true)
      .addField("Discord.js", require("discord.js").version, true)
      .setTimestamp();

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("dp:shutdown")
            .setLabel("Shutdown")
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