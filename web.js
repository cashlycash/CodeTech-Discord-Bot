const express = require("express");
const app = express();
const { request } = require("undici");

if (!process.env.port) console.log(`[🌐] No port defined. Defaulting to 3000`);
else console.log(`[🌐] Port: ${process.env.port}`);

async function keepAlive(client) {
  app.use("/static", express.static("views/static"));

  app.get("/", (req, res) => {
    res.render("index.ejs", {
      client: client,
    });
  });

  app.get("/ticket", async (req, res) => {
    try {
      const { body } = await request(req.query.url);
      res.send(await body.text());
    } catch (e) {
      res.send(e);
    }
  });
  const port = process.env.port || 3000;
  app.listen(port, () =>
    console.log(`[🌐] App listening on https://localhost:${port}/`)
  );
}

module.exports = keepAlive;
