const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  ephemeral: true,
  name: "purge",
  description: "Purge messages",
  options: [
    {
      name: "number",
      description: "How many messages to purge [infinity / number]",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  default_member_permissions: PermissionFlagsBits.ManageMessages.toString(),
  run: async (client, interaction) => {
    const inp = await interaction.options.getString("number", true);
    if (!inp) {
      interaction.followUp("Please provide a number or type infinity");
    } else if (inp.toLowerCase() === "infinity") {
      interaction.followUp("Purging the whole channel");
      const c = await interaction.channel.clone();
      c.setPosition(interaction.channel.position);
      interaction.channel.delete();
      c.send("Purged the whole channel");
    } else {
      if (inp < 1)
        return interaction.followUp("Please provide a proper number");
      var tm = 0;
      const ms = parseInt(inp);
      const l = ms % 100;
      var r = ms / 100 - l / 100;
      while (r > 0) {
        r--;
        const rm = await interaction.channel.messages.fetch({ limit: 100 });
        const rfm = await rm.filter((m) => !m.pinned);
        tm += rm.size;
        interaction.channel.bulkDelete(rm);
        setInterval(() => {
          //null
        }, 1000);
      }
      await setInterval(() => {
        //null
      }, 1000);
      if (l > 0) {
        const lms = await interaction.channel.messages.fetch({ limit: l });
        const lfm = await lms.filter((m) => !m.pinned);
        await interaction.channel.bulkDelete(lfm);
        tm += lfm.size;
      } else {
        await interaction.followUp(`**Deleted \`${tm}\` messages**`);
      }
    }
  },
};
