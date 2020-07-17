const Koa = require("koa");
const mount = require("koa-mount");
const home = require("./home");

const app = new Koa();
const port = 3000;

app.listen(port);
console.log(`App listening on port ${port}!`);

async function favicon(ctx, next) {
  await next();
  ctx.status = 200;
}

app.use(mount("/favicon.ico", favicon));

app.use(mount("/", home));
