const client = require("../index.js");

client.on("ready", async (msg) => {
  await require("../web")(client);
  const db = await require(process.cwd() + "/database.js").initalise();

  console.log(`Bot online as - ${client.user.tag}`);

  const t = await db.get("stat");
  if (t) {
    client.user.setPresence(JSON.parse(t));
  }

  // Rainbow role
  if (client.config.rainbowrole.enabled == "true") {
    let index = 0;
    let colors = client.config.rainbowrole.colors;
    setInterval(() => {
      let role = client.guilds.cache
        .get(client.config.server)
        .roles.cache.get(client.config.rainbowrole.role);
      role.setColor(colors[index]);
      index++;
      if (index == colors.length) {
        index = 0;
      }
    }, 5000);
  }
});
