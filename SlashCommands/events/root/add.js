const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  TextInputBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputStyle,
  Client,
  Message,
  ComponentType,
  StringSelectMenuBuilder,
  RoleSelectMenuBuilder,
  ChannelSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: (subcommand) =>
    subcommand.setName("add").setDescription("Add an event"),
  exec: async (interaction, client) => {},
};
