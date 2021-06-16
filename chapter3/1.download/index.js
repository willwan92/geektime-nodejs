const Koa = require('koa')
const mount = require('koa-mount')
const fs = require('fs')
const static = require('koa-static')

const app = new Koa()

app.use(
  // 处理静态资源路径
  static(__dirname + '/source')
)
app.use(mount('/', ctx => {
  ctx.status = 200
  ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
}))

app.listen(3000, () => {
  console.log('http 服务已启动');
})