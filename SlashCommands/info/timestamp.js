const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  ephemeral: true,
  name: "timestamp",
  description: "Make a discord timestamp",
  options: [
    {
      type: 3,
      name: "time",
      description: "time",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "subtract",
      description: "subtract",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    var timeAdded = interaction.options.getString("time");
    var subtract = interaction.options.getBoolean("subtract");
    var time;
    if (subtract) time = Date.now() - ms(timeAdded);
    else time = Date.now() + ms(timeAdded);
    time = time.toString().slice(0, -3);
    interaction.followUp(`\`<t:${time}:R>\``);
  },
};
