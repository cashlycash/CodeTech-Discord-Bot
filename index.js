const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
} = require(`discord.js`);

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
  ],
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
});

if (!process.env.token) {
  throw "No bot token defined";
}

process.on("unhandledRejection", (error) => {
  console.log(error);
});
process.on("uncaughtException", (error) => {
  console.log(error);
});
process.on("exit", (error) => {
  console.log(error);
});
client.on("error", (error) => {
  console.log(error);
});

client.ctbully = [];
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.btns = new Collection();
client.config = require("./config.json");

require("./handler")(client);

module.exports = client;
console.log(`[-----------${"-".repeat(process.env.token.length)}-]`);
console.log(`[🤖] Token: \"${process.env.token}\"`);
client.login(process.env.token);
