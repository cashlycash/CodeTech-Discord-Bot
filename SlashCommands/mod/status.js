const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

const types = [`PLAYING`, `STREAMING`, "LISTENING", "WATCHING", "COMPETING"];

const icons = ["online", "idle", "offline", "dnd"];

const db = require(process.cwd() + "/database.js").db;

module.exports = {
  ephemeral: true,
  name: "status",
  description: "Set the bot's status!",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description: "Status type",
      choices: types.map((type) => {
        return {
          name: type,
          value: type,
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
    const type = interaction.options.get("type").value;
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
