const { MessageActionRow, MessageEmbed, MessageButton } = require("discord.js");

module.exports = {
  name: "tktpanel",
  aliases: ["tp"],
  description: "Make a ticket panel",
  run: async (client, message) => {

    if (!message.member.permissions.has('MANAGE_GUILD')){
      return;
    }

    ch = message.channel

    const emb = new MessageEmbed()
      .setTitle('New Ticket')
      .setDescription('Click on the button below to create a ticket')
      .addField('NOTE!', '**`Spaming of ticket will result in strict action`**')
      .setColor('BLURPLE')

    const btn = new MessageActionRow()
      .setComponents(
        new MessageButton() 
          .setLabel('CREATE TICKET')
          .setStyle('PRIMARY')
          .setEmoji('🎫')
          .setCustomId('tkt')
      )
    ch.send({embeds: [emb], components: [btn]})
    message.delete();
  },
};