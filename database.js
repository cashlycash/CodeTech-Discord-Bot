const { QuickDB } = require("quick.db");
const { MongoDriver } = require("quickmongo");

if (!process.env.mongodb) {
  throw "No MongoDB url defined";
}

class database {
  constructor() {
    console.log(`[📂] MongoDB URL: ${process.env.mongodb}`);
    this.driver = new MongoDriver(process.env.mongodb);
  }
  async initalise() {
    await this.driver.connect();
    console.log(`[📂] Connected to the database!`);
    this.db = new QuickDB({ driver: this.driver });
    return this.db;
  }
}

module.exports = new database();
