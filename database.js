const { QuickDB } = require("quick.db");
const { MongoDriver } = require("quickmongo");

if (!process.env.mongodb) {
  throw "No MongoDB url defined";
}
console.log(`[📂] MongoDB URL: ${process.env.mongodb}`);

var db;

var initalise = async () => {
  const driver = new MongoDriver(process.env.mongodb);
  await driver.connect();
  console.log(`[📂] Connected to the database!`);
  db = new QuickDB({ driver });

  return db;
};

module.exports = {
  db,
  initalise,
};
