const ms = require("ms");

module.exports = {
  name: "russianroulette",
  aliases: ["gol", "roulette", "grr", "god"],
  description: "Play russian roulette where the unlucky one gets muted",
  usage: "<time> <@user> <@user> ...",
  UserPerms: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    var pps = message.mentions.members;
    var pps  = pps.toJSON();
    var unlucky = pps[Math.floor(Math.random() * pps.length)];
    var newpps = pps.filter((x) => x.id !== unlucky.id);
    newpps.push(unlucky);

    if (newpps.length < 2) return message.reply(`Not enough players`);

    message.reply(`Welcome to russian roulette\n\`[ Spinning the chamber ]\``).then((msg) => {
      for (let i = 0; i < newpps.length; i++) {
        setTimeout(() => {
          if (newpps[i].id === unlucky.id) {
            unlucky.timeout(ms(args[0]), "roulette");
    
            message.reply(
              `> **<@!${unlucky.user.id}>** got \`UNLUCKY\` and muted for ${
                args[0]
              } :rofl:`
            );

            return msg.edit(
              `Gun passed to <@!${newpps[i].user.id}>\n\`[ Gun shot sounds ]\``
            );
          }
          msg.edit(`Gun passed to <@!${newpps[i].user.id}>\n\`[ Empty trigger pulled ]\``);
        }, 2000 * i);
      }
    });
  },
};
