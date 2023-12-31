const client = require("../index.js");
const db = require(process.cwd() + "/database.js");

client.on("ready", async (msg) => {

  require("../web")(client);
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
      let role = client.guilds.cache.get(client.config.server).roles.cache.get(client.config.rainbowrole.role);
      role.setColor(colors[index])
      index++
      if (index == colors.length){
        index = 0
      }
    }, 5000);
  }
});
