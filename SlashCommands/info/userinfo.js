/* eslint-disable */

const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "userinfo",
  description: "Retrive the information of a server member",
  options: [
    {
      name: "member",
      description: "Person whom you want information about",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const member =
      interaction.options.getMember("member") || interaction.member;
    const activities = member.presence?.activities || [];

    const focusActivity = activities.find((x) => x.assets);
    const embed = new EmbedBuilder()
      .setAuthor({
        name: member.user.username.toString(),
        iconURL: member.user.displayAvatarURL(),
      })
      .setColor(
        member.displayHexColor === "#000000"
          ? "#ffffff"
          : member.displayHexColor
      )
      .setThumbnail(
        focusActivity
          ? `https://cdn.discordapp.com/app-assets/${focusActivity.applicationId}/${focusActivity.assets.largeImage}`
          : member.user.displayAvatarURL()
      )
      .setDescription(
        activities
          .map(
            (x, i) =>
              `**${x.type}**: \n> \`${x.name || "None"} : ${
                x.details || "None"
              } : ${x.state || "None"}\``
          )
          .join("\n") || "`No Activities`"
      )
      .addFields(
        {
          name: "JoinedAt",
          value: `<t:${member.joinedTimestamp.toString().slice(0, -3)}:R>`,
          inline: true,
        },
        {
          name: "Account Created At",
          value: `<t:${member.user.createdTimestamp
            .toString()
            .slice(0, -3)}:R>`,
          inline: true,
        },
        {
          name: "Common Information",
          value: [
            `Real Name: \`${member.displayName}\``,
            `Kewl kid: \`${
              member.roles.cache.has("1014907026553450557") ? "Yes" : "No"
            }\``,
            `Booster: \`${
              member.premiumSince
                ? "since " + member.premiumSince.toLocaleString()
                : "Nope"
            }\``,
          ].join("\n"),
        }
      );

    return interaction.followUp({ embeds: [embed] });
  },
};
