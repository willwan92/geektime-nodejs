const Koa = require("koa");
const mount = require("koa-mount");
const home = require("./home");
const gameKoaUse = require("./game");

const app = new Koa();
const gameKoa = new Koa();
const port = 3000;


async function favicon(ctx, next) {
  await next();
  ctx.status = 200;
  ctx.body = '';
}

app.use(mount("/favicon.ico", favicon));
app.use(mount("/game", gameKoa));
gameKoaUse(gameKoa);
app.use(mount("/", home));

app.listen(port);
console.log(`App listening on port ${port}!`);