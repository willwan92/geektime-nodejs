const koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const graphqlHTTP = require('koa-graphql')
const fs = require('fs')
const schema = require('./schema')

const app = new koa()

// 定义graphql api接口(依赖koa-graphql)
app.use(mount('/api', graphqlHTTP({
  schema,
  graphiql: true
})))

app.use(mount('/static', static(`${__dirname}/source/static`)))

app.use(mount('/', (ctx) => {
  ctx.status = 200
  ctx.body = fs.readFileSync(`${__dirname}/source/index.htm`, 'utf-8')
}))

module.exports = app