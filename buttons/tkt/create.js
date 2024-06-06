const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  id: "tkt:m",
  run: async (client, interaction) => {
    const everyoneRole = interaction.guild.roles.cache.find(
      (r) => r.name == "@everyone"
    );
    const ce = interaction.guild.channels.cache.find(
      (ch) => ch.name == `ticket-${interaction.user.id}`
    );
    if (ce) {
      return interaction.reply({
        content: `Please close your existing ticket (<#${ce.id}>)`,
        ephemeral: true,
      });
    }
    interaction.guild.channels
      .create({
        name: `ticket-${interaction.user.id}`,
        topic: `Ticket for <@!${interaction.user.id}>`,
        parent: client.config.ticket.categ,
      })
      .then((c) => {
        c.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
        });
        c.permissionOverwrites.create(client.user.id, { ViewChannel: true });
        c.permissionOverwrites.create(client.config.ticket.modrole, {
          ViewChannel: true,
        });
        c.permissionOverwrites.create(everyoneRole.id, {
          ViewChannel: false,
        });

        const emb = new EmbedBuilder()
          .setTitle(`Hey! ${interaction.user.username}`)
          .setDescription(
            "Please do not ping the staff. We will get to you as soon as possible."
          )
          .setColor("Blurple");

        const btn = new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setLabel("Close Ticket")
            .setCustomId("tkt:c")
            .setStyle(ButtonStyle.Danger)
        );

        c.send({
          content: `<@${interaction.user.id}>`,
          embeds: [emb],
          components: [btn],
        });
        interaction.reply({
          content: `> **Done!**, Check <#${c.id}>`,
          ephemeral: true,
        });
      });
  },
};
