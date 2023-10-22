module.exports = {
  id: "dp:handeled",
  run: (client, interaction) => {
    const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");
    
    console.log(client.slashCommands.size);
    console.log(client.commands.size);
    console.log(client.btns.size);

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Handeled Information")
      .addField("Slash Commands", `\`${client.slashCommands.size}\``, true)
      .addField("Commands", `\`${client.commands.size}\``, true)
      .addField("Buttons", `\`${client.btns.size}\``, true)
      .setTimestamp();

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("dp:reregister")
          .setLabel("Re-register Commands")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("dp:reloadenb")
          .setLabel("Reload All Buttons")
          .setStyle("PRIMARY"),
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