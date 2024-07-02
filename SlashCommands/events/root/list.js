module.exports = {
  data: (subcommand) =>
    subcommand.setName("list").setDescription("List all events"),
  exec: async (interaction, client) => {},
};
