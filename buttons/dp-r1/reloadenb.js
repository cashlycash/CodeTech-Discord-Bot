const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = {
  id: "dp:reloadenb",
  run: (client, interaction) => {
    const { MessageEmbed , MessageActionRow , MessageButton } = require("discord.js");
    const embed = new MessageEmbed()
      .setColor("BLUE")
      .setTitle("Reloading all Buttons...")

    interaction.reply({ embeds: [embed], ephemeral: true })
    
    setTimeout(async () => {

      //Button Handler
      const btnsf = await globPromise(`${process.cwd()}/buttons/**/*.js`);
      btnsf.map((value) => {
        const file = require(value);
        if (!file?.id) return;
        client.btns.set(file.id, file);
      });

    }, 1000);
  },
};