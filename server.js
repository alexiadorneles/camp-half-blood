const express = require("express");
const path = require("path");

const app = express();

const configs = {
  caminho: "build",
  forcarHTTPS: true,
  port: process.env.PORT || 3000
}

if (configs.forcarHTTPS)
  app.use((req, res, next) => {
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
      res.redirect(`https://${req.headers.host}${req.url}`);
    else
      next();
  });

app.use(express.static(configs.caminho));

app.get("*service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, configs.caminho, "index.html"));
});

app.listen(configs.port, () => {
  console.log(`Escutando na ${configs.port}!`);
});