const client = require("../index.js");
const { PermissionFlagsBits } = require(`discord.js`);

client.on("messageCreate", async (message) => {
  const i = await message.content.match(
    /(https:\/\/)?(www\.)?(((discord(app)?)?\.com\/invite)|((discord(app)?)?\.gg))\/(?<invite>.+)/gm
  );
  if (i && !message.member.permissions.has(PermissionFlagsBits.Administrator)) {
    await message.reply("NO DISCORD INVITES PLEASE");
    await message.delete();
    return;
  }
  if (message.author.bot) return;
  const prefix = client.config.prefix;
  var args = message.content.slice(prefix.length).trim().split(/ +/g);
  command = args.shift().toLowerCase();
  cmd =
    client.commands.get(command) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
  if (message.content.indexOf(prefix) !== 0) return;
  if (cmd) {
    if (!message.member.permissions.has(cmd.UserPerms || [])) {
      var permW = Object.keys(PermissionFlagsBits).find(
        (key) => PermissionFlagsBits[key] == cmd.UserPerms[0]
      );
      return message.channel.send(`You need \`[${permW}]\` Permissions`);
    } else {
      cmd.run(client, message, args, prefix);
    }
  }
});
