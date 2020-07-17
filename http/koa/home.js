const fs = require("fs");

// 首页
async function home(ctx, next) {
  next();
  ctx.status = 200;
  ctx.body = fs.readFileSync("../index.html", "utf-8");
}

module.exports = home;
