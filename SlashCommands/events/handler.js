// const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
// const fs = require("fs");
// const path = require("path");

// var slashcmd = new SlashCommandBuilder()
//   .setName("events")
//   .setDescription("Events related commands");

// var folders = fs.readdirSync(__dirname).filter((folder) => {
//   return fs.statSync(path.join(__dirname, folder)).isDirectory();
// });

// folders.forEach((folder) => {
//   var files = fs.readdirSync(path.join(__dirname, folder)).filter((file) => {
//     return file.endsWith(".js");
//   });

//   if (folder != "root") {
//     slashcmd.addSubcommandGroup((group) => {
//       group.setName(folder).setDescription(`${folder} related commands`);

//       files.forEach((file) => {
//         var command = require(path.join(__dirname, folder, file));
//         group.addSubcommand(command.data);
//       });
//       return group;
//     });
//   } else {
//     files.forEach((file) => {
//       var command = require(path.join(__dirname, folder, file));
//       slashcmd.addSubcommand(command.data);
//     });
//   }
// });

// module.exports = {
//   ...slashcmd.toJSON(),
//   async execute(interaction, client) {
//     const subcommand = interaction.options.getSubcommand();
//     const subcommandGroup = interaction.options.getSubcommandGroup(false);

//     if (subcommandGroup) {
//       require(`./${subcommandGroup}/${subcommand}.js`).exec(
//         interaction,
//         client
//       );
//     } else {
//       require(`./root/${subcommand}.js`).exec(interaction, client);
//     }
//   },
// };
