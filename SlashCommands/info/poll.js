const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require(process.cwd() + "/database.js");

module.exports = {
  name: "poll",
  description: "Hold a poll",
  options: [
    {
      name: "content",
      description: "poll's content",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const cont = interaction.options.getString("content");
    const emb = new MessageEmbed()
      .setTitle("Poll")
      .setDescription(`${cont}`)
      .setColor("YELLOW");
    const btn = new MessageActionRow().setComponents(
      new MessageButton()
        .setLabel("0")
        .setStyle("SUCCESS")
        .setEmoji("👍")
        .setCustomId("vote:yes"),
      new MessageButton()
        .setLabel("0")
        .setStyle("DANGER")
        .setEmoji("👎")
        .setCustomId("vote:no"),
      new MessageButton()
        .setLabel("END POLL")
        .setStyle("PRIMARY")
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
