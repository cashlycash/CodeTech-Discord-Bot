const { PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "russianroulette",
  aliases: ["gol", "roulette", "grr", "god"],
  description: "Play russian roulette where the unlucky one gets muted",
  usage: "[time] <@user> <@user> ...",
  UserPerms: [PermissionFlagsBits.Administrator],
  run: async (client, message, args) => {
    var pps = message.mentions.members;
    var pps = pps.toJSON();

    if (pps.length < 2) return message.reply(`Not enough players`);

    filteredpps = pps.filter(
      (x) => client.config.botadmins.includes(x.id) === false
    );

    var unlucky = filteredpps[Math.floor(Math.random() * filteredpps.length)];
    var newpps = pps.filter((x) => x.id !== unlucky.id);
    newpps.push(unlucky);

    message
      .reply(`Welcome to russian roulette\n\`[ Spinning the chamber ]\``)
      .then((msg) => {
        for (let i = 1; i <= newpps.length; i++) {
          setTimeout(() => {
            setTimeout(() => {
              if (newpps[i - 1].id === unlucky.id) {
                unlucky.timeout(ms(args[0]), "roulette");
                msg.edit(
                  `Gun passed to <@!${
                    newpps[i - 1].user.id
                  }>\n\`[ Gun shot sounds ]\``
                );

                setTimeout(() => {
                  message.reply(
                    `> **<@!${unlucky.user.id}>** got \`UNLUCKY\` and muted for ${args[0]} :rofl:`
                  );
                }, 2000);
              } else {
                msg.edit(
                  `Gun passed to <@!${
                    newpps[i - 1].user.id
                  }>\n\`[ Empty trigger pulled ]\``
                );
              }
            }, 2000);
            msg.edit(`Gun passed to <@!${newpps[i - 1].user.id}>`);
          }, 5000 * i);
        }
      });
  },
};
