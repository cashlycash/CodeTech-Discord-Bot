const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const owners = ["908554250945183744"];

module.exports = {
  name: "verifypanel",
  aliases: ["vp"],
  description: "Make a panel with button to verify a user",
  run: (client, message, args) => {

    if (!message.member.permissions.has('MANAGE_GUILD')){
      return;
    }
    
    const emb = new MessageEmbed()
      .setTitle("Verify")
      .setColor("#6600ff")
      .setDescription(
        "Click the button bellow to verify and get access to the rest of the server"
      );

    const btn = new MessageActionRow().setComponents(
      new MessageButton()
        .setLabel("Verify")
        .setCustomId("verify")
        .setStyle("SUCCESS")
    );
    message.channel.send({ embeds: [emb], components: [btn] });
    message.delete();
  },
};
