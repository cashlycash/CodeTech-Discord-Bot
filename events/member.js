const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const client = require("../index");
const db = require(process.cwd() + "/database.js").db;

client.on("guildMemberAdd", async (member) => {
  const emb = new EmbedBuilder()
    .setTitle("Verify")
    .setColor("#6600ff")
    .setDescription(
      "Click any one of the buttons bellow to verify and get access to the rest of the server"
    );

  const btn = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setLabel("Verify")
      .setCustomId("verify")
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setLabel("Verifical Portal")
      .setStyle(ButtonStyle.Link)
      .setURL(client.config.verify.panelurl)
  );

  member.send({
    embeds: [emb],
    components: [btn],
  });
});

client.on("guildMemberRemove", async (member) => {
  if (member.user.bot) return;

  const emb = new EmbedBuilder()
    .setTitle(`${member.user.username} Left 😢`)
    .setDescription(`Hope to see them soon`)
    .setColor(`Yellow`);

  member.guild.channels.cache
    .get(client.config.leave.channel)
    .send({ embeds: [emb] });

  var count = member.guild.members.cache;
  const no = count.size;
  client.channels.cache
    .get(client.config.count.channel)
    .setName(client.config.count.format.replace(`:no:`, no));
});
