/**
 * 实现 rpc 服务：
 * 1. 获取评论列表数据
 * 2. 根据模型生成生成 schemas , 创建rpc实例时使用（依赖protocol-buffers）
 * 3. 创建 rpc 实例（依赖./lib/geeknode-rpc-server）
 * 4. 创建 rpc 服务，返回评论列表数据，监听 4001 端口（不同接口用不同端口，类似于微服务）
 */

 const protocolBuf = require('protocol-buffers')
 const fs = require('fs')
 const createRpc = require('./lib/geeknode-rpc-server')
 const schemas = protocolBuf(fs.readFileSync(`${__dirname}../3.play/schema/comment.proto`))
 
 const comments = require('./mockdata/comment')
 const rpc = createRpc(schemas.CommentListRequest, schemas.CommentListResponse)
 
 rpc.createServer((request, response) => {
   response.end({ comments })
 }).listen(4001, () => {
   console.log('rpc server listened: 4002')
 })