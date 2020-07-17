const fs = require("fs");
const app = require("./app");

// 首页
app.get("/", (req, res) => {
  res.status(200);
  res.send(fs.readFileSync("../index.html", "utf-8"));
});
