const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  SlashCommandBuilder,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  ephemeral: true,
  name: "mute",
  description: "MUTE",
  options: [
    {
      type: 3,
      name: "time",
      description: "time",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "user",
      description: "Person whom you want to mute",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "Why mute",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
  run: async (client, interaction) => {
    const u = interaction.options.getMember("user");
    const r = interaction.options.getString("reason");
    let timeAdded = interaction.options.getString("time");

    const ea = new EmbedBuilder()
      .setTitle("You have been muted in " + interaction.guild.name)
      .setDescription(
        `**Staff Responsible** - <@!${interaction.user.id}> [${interaction.user.username}]\n**Reason** - \`${r}\``
      );
    u.timeout(ms(timeAdded), r);
    u.send({ embeds: [ea] });
    interaction.followUp("Done!");
  },
};
