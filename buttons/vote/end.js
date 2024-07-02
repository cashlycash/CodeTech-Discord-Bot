const { EmbedBuilder } = require("discord.js");

module.exports = {
  id: "vote:end",
  run: async (client, interaction) => {
    var db = client.db;
    const vp = `${interaction.message.id}:vote:owner`;
    const owner = await db.get(vp);
    if (owner != interaction.user.id) {
      return interaction.reply({
        content: `Only the poll owner <@!${owner}> can do this`,
        ephemeral: true,
      });
    }
    var nb = interaction.message.components[0].components;
    const yes = parseInt(nb[0].label);
    const no = parseInt(nb[1].label);
    const total = yes + no;

    const p1 = (yes / total) * 100;
    const p2 = (no / total) * 100;

    var color = null;
    if (yes > no) color = "Green";
    else color = "Red";

    const emb = new EmbedBuilder(interaction.message.embeds[0])
      .setColor(color)
      .addFields({
        name: "Result",
        value: `**UPVOTES -** \`${yes}\` (${p1}%)\n**DOWNVOTES -** \`${no}\` (${p2}%)`,
      });
    interaction.update({ components: [], embeds: [emb] });
  },
};
