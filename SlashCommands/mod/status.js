const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  ActivityType,
} = require("discord.js");

const types = {
  PLAYING: ActivityType.Playing,
  STREAMING: ActivityType.Streaming,
  LISTENING: ActivityType.Listening,
  WATCHING: ActivityType.Watching,
  COMPETING: ActivityType.Competing,
  CUSTOM: ActivityType.Custom,
};

const icons = ["online", "idle", "offline", "dnd"];

module.exports = {
  ephemeral: true,
  name: "status",
  description: "Set the bot's status!",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description: "Status type",
      choices: Object.keys(types).map((type) => {
        return {
          name: type,
          value: types[type].toString(),
        };
      }),
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "name",
      description: "Status Text",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "icon",
      description: "Status Icon",
      choices: icons.map((ic) => {
        return {
          name: ic,
          value: ic,
        };
      }),
      required: false,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "url",
      description: "Status url",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
  run: async (client, interaction) => {
    var db = client.db;
    const type = parseInt(interaction.options.get("type").value);
    const name = interaction.options.getString("name");
    const icon = interaction.options.get("icon")
      ? interaction.options.get("icon").value
      : client.user.presence.status;
    const url = interaction.options.getString("url");
    const dat = {
      activities: [{ name, type, url }],
      status: icon.toLowerCase(),
    };
    await client.user.setPresence(dat);
    await db.set("stat", JSON.stringify(dat));
    interaction.followUp(JSON.stringify({ type, name, icon, url }));
  },
};
