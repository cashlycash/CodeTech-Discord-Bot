const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "reactroles",
  aliases: ["rr"],
  UserPerms: ["ADMINISTRATOR"],
  run: (client, message, args) => {
    const emb = new MessageEmbed()
      .setTitle(args[0] + " Roles")
      .setColor("#6600ff")
      .setDescription(
        "Click the button below to get the role, click again to remove it"
      );

    let buttons = [];
    
    args.slice(1).forEach((a) => {
      const r = message.guild.roles.cache.get(a);
      buttons.push(
        new MessageButton()
          .setLabel(r.name)
          .setCustomId(`br:${r.id}`)
          .setStyle("PRIMARY")
      );
    });

    let rows = [];
    let start = 0;

    for (let i = 0; i < Math.ceil(buttons.length / 5); i++) {
      rows.push(
        new MessageActionRow().addComponents(buttons.slice(start, start + 5))
      );
      start += 5;
    }

    message.channel.send({ embeds: [emb], components: rows });
    message.delete();
  },
};
