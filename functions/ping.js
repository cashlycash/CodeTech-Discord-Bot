const client = require("../index.js");
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageSelectMenu,
  EmbedBuilder,
} = require("discord.js");

function ping(message) {
  var color = "#ffffff";
  var status = null;
  var main_let = Date.now() - message.createdTimestamp;
  main_let += Math.round(client.ws.ping);
  if (main_let > 0) {
    color = "90ee90";
    status = "VERY GOOD";
  }
  if (main_let > 100) {
    color = "#006400";
    status = "GOOD";
  }
  if (main_let > 150) {
    color = "#ffff00";
    status = "NORMAL";
  }
  if (main_let > 200) {
    color = "#ff0000";
    status = "BAD";
  }
  if (main_let > 250) {
    color = "#8b0000";
    status = "VERY BAD";
  }
  const emb = new EmbedBuilder()
    .setTitle("Latency!")
    .setDescription(`All the Latency is listed below`)
    .addFields(
      {
        name: "Bot Latency",
        value: `${Date.now() - message.createdTimestamp}ms`,
      },
      { name: "API Latency", value: `${Math.round(client.ws.ping)}ms` },
      { name: "Overall", value: `${main_let}ms which is ${status}` }
    )
    .setColor(color);
  const btn = new ActionRowBuilder().setComponents(
    new ButtonBuilder()
      .setCustomId("ping_reload")
      .setStyle(ButtonStyle.Danger)
      .setLabel("Refresh")
      .setEmoji("🔄")
  );
  return { embeds: [emb], components: [btn] };
}

module.exports = ping;
