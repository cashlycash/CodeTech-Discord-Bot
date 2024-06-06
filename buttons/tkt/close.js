const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");

module.exports = {
  id: "tkt:c",
  run: async (client, interaction) => {
    const m = interaction.message.components[0];
    m.components[0].disabled = true;
    await interaction.message.edit({ components: [m] });

    await interaction.deferReply();
    var c = interaction.channel;
    const au = c.name.split("-")[1];
    c.permissionOverwrites.create(au, { ViewChannel: false });

    const att = await discordTranscripts.createTranscript(c);

    const btn = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setLabel("Delete Ticket")
        .setCustomId("tkt:d")
        .setStyle(ButtonStyle.Danger)
    );
    const emb = new EmbedBuilder()
      .setTitle("The ticket was closed!")
      .setDescription(
        `By - <@!${interaction.user.id}>\nTicket Owner - <@!${au}>`
      )
      .setColor("Red");

    var stuf = {
      content: "Ticket Closed!",
      embeds: [emb],
      components: [btn],
    };

    var sc = client.channels.cache.get(client.config.ticket.scripts);
    if (sc) {
      sc.send({
        content: `Ticket of <@!${au}>`,
        files: [att],
      }).then((msg) => {
        link = `${client.config.ticket.hostedurl}/ticket?url=${
          msg.attachments.first().url
        }`;
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("View Transcript")
            .setStyle(ButtonStyle.Link)
            .setURL(link)
        );
        msg.edit({ embeds: [emb] });
      });
    }

    c = c.setName(`closed-${au}`);

    interaction.followUp(stuf);

    stuf.components = [];
    client.users.cache
      .get(au)
      .send(stuf)
      .catch(() => {
        c.send("I was unable to DM the ticket owner");
      });
  },
};
