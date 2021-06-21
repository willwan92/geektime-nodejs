const koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const fs = require('fs')

const app = new koa()

app.use(mount('/static', static(`${__dirname}/source/static`)))

app.use(mount('/', (ctx) => {
  ctx.status = 200
  ctx.body = fs.readFileSync(`${__dirname}/source/index.htm`, 'utf-8')
}))

module.exports = app