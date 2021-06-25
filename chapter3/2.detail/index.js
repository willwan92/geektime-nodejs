/**
 * 1. 获取模板
 * 2. 处理静态资源路径
 * 3. rpc调用获取数据，渲染模板，返回给浏览器
 */

const fs = require('fs')
const Koa = require('koa')
const mount = require('koa-mount')
const static = require('koa-static')
const rpcClient = require('./client')
const template = require('./template')
const detailTpl = template(__dirname + '/template/index.html')
 
const app = new Koa()

app.use(mount('/static', static(__dirname + '/source/static')))
app.use(async ctx => {
  // 检查参数
  if (!ctx.query.columnid) {
    ctx.status = 400
    ctx.body = 'invalid columnid'
    return
  }

  // 发起rpc调用获取数据
  const data = await new Promise ((resolve, reject) => {
    rpcClient.write({ columnid: ctx.query.columnid }, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })

  // 返回
  ctx.status = 200
  ctx.body = detailTpl(data)
})

// app.listen(3000)

module.exports = app
 