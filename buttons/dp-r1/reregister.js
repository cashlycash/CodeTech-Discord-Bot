const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = {
  id: "dp:reregister",
  run: (client, interaction) => {
    var owners = client.config.botadmins;
    if (!owners.includes(interaction.member.user.id)) {
      return interaction.reply({ content: "Limited To The Bot Admins Only!" , ephemeral: true });
    }
    const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");

    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Re-registering all commands...")

    interaction.reply({ embeds: [embed], ephemeral: true })

    setTimeout(async () => {
      // Slash Commands
      const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
      );
      const arrayOfSlashCommands = [];
      slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);
        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if (file.userPermissions) file.defaultPermission = false;
        arrayOfSlashCommands.push(file);
      });
      client.guilds.cache
        .get(client.config.server)
        .commands.set(arrayOfSlashCommands)
        .catch((e) => {
          return;
        });

      //Command Handler
      const commandfiles = await globPromise(
        `${process.cwd()}/commands/**/*.js`
      );
      commandfiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
          const properties = {
            directory,
            ...file,
          };
          client.commands.set(file.name, properties);
        }
        if (file.aliases && Array.isArray(file.aliases)) {
          file.aliases.forEach((alias) => client.aliases.set(alias, file.name));
        }
      });

    }, 1000);
  },
};
