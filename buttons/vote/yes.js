module.exports = {
  id: "vote:yes",
  run: async (client, interaction) => {
    var db = client.db;
    const vp = `${interaction.message.id}:${interaction.user.id}:vote`;
    var n = null;
    if ((await db.get(vp)) == "no") {
      n = interaction.message.components;
      var nb = n[0].components;
      const d = nb[1].label;
      const x = parseInt(d) - 1;
      n[0].components[1].label = x.toString();
      const d2 = nb[0].label;
      const x2 = parseInt(d2) + 1;
      n[0].components[0].label = x2.toString();
      await db.set(vp, "yes");
    } else if ((await db.get(vp)) == "yes") {
      n = interaction.message.components;
      var nb = n[0].components;
      const d = nb[0].label;
      const x = parseInt(d) - 1;
      n[0].components[0].label = x.toString();
      await db.set(vp, "null");
    } else {
      n = interaction.message.components;
      var nb = n[0].components;
      const d = nb[0].label;
      const x = parseInt(d) + 1;
      n[0].components[0].label = x.toString();
      await db.set(vp, "yes");
    }
    interaction.update({ components: n });
  },
};
