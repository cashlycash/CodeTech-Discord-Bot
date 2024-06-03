const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const client = require("../index");
const db = require(process.cwd() + "/database.js").db;

client.on("guildMemberAdd", async (member) => {
  const emb = new MessageEmbed()
    .setTitle("Verify")
    .setColor("#6600ff")
    .setDescription(
      "Click any one of the buttons bellow to verify and get access to the rest of the server"
    );

  const btn = new MessageActionRow().setComponents(
    new MessageButton()
      .setLabel("Verify")
      .setCustomId("verify")
      .setStyle("SUCCESS"),
    new MessageButton()
      .setLabel("Verifical Portal")
      .setStyle("LINK")
      .setURL(client.config.verify.panelurl)
  );

  member.send({
    embeds: [emb],
    components: [btn],
  });
});

client.on("guildMemberRemove", async (member) => {
  if (member.user.bot) return;

  const emb = new MessageEmbed()
    .setTitle(`${member.user.username} Left 😢`)
    .setDescription(`Hope to see them soon`)
    .setColor(`YELLOW`);

  member.guild.channels.cache
    .get(client.config.leave.channel)
    .send({ embeds: [emb] });

  var count = member.guild.members.cache;
  const no = count.size;
  client.channels.cache
    .get(client.config.count.channel)
    .setName(client.config.count.format.replace(`:no:`, no));
});
