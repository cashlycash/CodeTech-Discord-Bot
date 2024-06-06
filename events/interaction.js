const client = require("../index.js");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { Modal, TextInputComponent } = require("discord-modals");
const ping = require("../functions/ping.js");
const db = require(process.cwd() + "/database.js").db;

client.on("modalSubmit", async (interaction) => {
  const s = interaction.customId.split(":");
  const se = interaction.customId;
  if (se == "verify") {
    if (!interaction.guild) {
      interaction.member = client.guilds.cache
        .get(client.config.server)
        .members.cache.get(interaction.user.id);
    }
    var name = interaction.getTextInputValue("name").trim().split(" ");
    name.forEach((e, index) => {
      name[index] = e[0].toUpperCase() + e.slice(1).toLowerCase();
    });
    name = name.join(" ");
    var clas = parseInt(interaction.getTextInputValue("class"));
    var sec = interaction.getTextInputValue("sec").toUpperCase();

    if (clas.toString() == "NaN") {
      return interaction.reply({
        content: "Please make sure that your class is a number",
        ephemeral: true,
      });
    } else if (clas < 6 || clas > 12) {
      return interaction.reply({
        content:
          "Please make sure that your class is a number between 6 and 12",
        ephemeral: true,
      });
    } else if (sec.length > 1) {
      return interaction.reply({
        content: "Please make sure that your section is just 1 character",
        ephemeral: true,
      });
    } else if (sec.charCodeAt(0) < 65 || sec.charCodeAt(0) > 90) {
      return interaction.reply({
        content: "Please make sure that your section is a letter",
        ephemeral: true,
      });
    }

    await client.config.verify.roles.forEach(async (r) => {
      await interaction.guild.members.cache
        .get(interaction.member.user.id)
        .roles.add(r);
    });

    interaction.member.setNickname(`${name} | ${clas}-${sec}`);

    interaction.reply({
      content: "Verified!!",
      ephemeral: true,
    });

    const member = interaction.member;

    const welcome = new MessageEmbed()
      .setColor("#3cff00")
      .setTimestamp()
      .setTitle(`${name} | ${clas}-${sec}, Welcome to ${member.guild.name}!`)
      .setDescription(
        `Collect roles from <#${client.config.verify.channels.selfroles}>. Incase of any queries use <#${client.config.verify.channels.ticket}>.`
      )
      .setThumbnail(await interaction.member.user.avatarURL({ dynamic: true }))
      .setFooter({
        text: `We hope you have a good time at ${member.guild.name}`,
        iconURL: member.guild.iconURL({ dynamic: true }),
      });

    client.channels.cache
      .get(client.config.verify.channel)
      .send({ content: `<@!${interaction.user.id}>`, embeds: [welcome] });

    var count = member.guild.members.cache;
    const no = count.filter((member) => !member.user.bot).size;
    client.channels.cache
      .get(client.config.count.channel)
      .setName(client.config.count.format.replace(`:no:`, no));
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    const sid = interaction.customId.toString().split(":");
    const id = interaction.customId.toString();
    if (id == "ping_reload") {
      interaction.update(ping(interaction));
    }
  }
});
