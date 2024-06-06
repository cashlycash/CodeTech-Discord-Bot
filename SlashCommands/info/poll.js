const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ApplicationCommandOptionType,
} = require("discord.js");
const db = require(process.cwd() + "/database.js").db;

module.exports = {
  name: "poll",
  description: "Hold a poll",
  options: [
    {
      name: "content",
      description: "poll's content",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const cont = interaction.options.getString("content");
    const emb = new EmbedBuilder()
      .setTitle("Poll")
      .setDescription(`${cont}`)
      .setColor("Yellow");
    const btn = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setLabel("0")
        .setStyle(ButtonStyle.Success)
        .setEmoji("👍")
        .setCustomId("vote:yes"),
      new ButtonBuilder()
        .setLabel("0")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("👎")
        .setCustomId("vote:no"),
      new ButtonBuilder()
        .setLabel("END POLL")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("vote:end")
    );

    const msg = await interaction.followUp({
      embeds: [emb],
      components: [btn],
    });

    const vp = `${msg.id}:vote:owner`;
    await db.set(vp, interaction.user.id);
  },
};
