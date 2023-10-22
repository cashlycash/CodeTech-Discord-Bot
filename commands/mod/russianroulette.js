const ms = require("ms");

module.exports = {
  name: "russianroulette",
  aliases: ["gol", "roulette", "grr"],
  UserPerms: ["ADMINISTRATOR"],
  run: async (client, message, args) => {
    var pps = message.mentions.members;
    var pps  = pps.toJSON();
    var unlucky = pps[Math.floor(Math.random() * array.length)];
    var newpps = pps.filter((x) => x.id !== unlucky.id);
    var newpps = newpps.push(unlucky);

    message.reply(`Welcome to russian roulette\n\`[ Spinning the chamber ]\``).then((msg) => {
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
          if (array[i].id === unlucky.id) {
            unlucky.timeout(ms(args[0] || "1m"), "roulette");
    
            message.reply(
              `> **<@!${unlucky.user.id}>** got \`UNLUCKY\` and muted for ${
                args[0] || "1m"
              } :rofl:`
            );

            return msg.edit(
              `Gun passed to <@!${array[i].user.id}>\n\`[ Gun shot sounds ]\``
            );
          }
          msg.edit(`Gun passed to <@!${array[i].user.id}>\n\`[ Empty trigger pulled ]\``);
        }, 1000 * i);
      }
    });
  },
};
