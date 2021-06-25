/**
 * 实现 rpc 服务：
 * 1. 获取评论列表数据
 * 2. 根据模型生成生成 schemas , 创建rpc实例时使用（依赖protocol-buffers）
 * 3. 创建 rpc 实例（依赖./lib/geeknode-rpc-server）
 * 4. 创建 rpc 服务，根据传入的commentid增加对应评论的点赞数，返回评论id和点赞数，监听 4002 端口（不同接口用不同端口，类似于微服务）
 */
const protocolBuf = require('protocol-buffers')
const fs = require('fs')
const createRpc = require('./lib/geeknode-rpc-server')
const schemas = protocolBuf(fs.readFileSync(`${__dirname}/../3.play/schema/comment.proto`))

const comments = require('./mockdata/comment')
const rpc = createRpc(schemas.PraiseRequest, schemas.PraiseResponse)

rpc.createServer((request, response) => {
  const commentid = request.body.commentid
  const comment = comments.filter((item) => item.id === commentid)[0]
  if (comment) {
    comment.praiseNum ++
  }

  response.end({
    commentid: comment.id,
    praiseNum: comment.praiseNum
  })
}).listen(4002, () => {
  console.log('rpc server listened: 4002')
})