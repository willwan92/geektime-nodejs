/**
 * 1. 创建 rpc-client， 依赖easy_sock
 * 2. 根据模型生成生成 schemas , 方便编解码（依赖protocol-buffers）
 * 3. 实现 encode 方法，编码请求参数，返回编码后的buffer
 * 4. 实现 decode 方法，解码返回参数，返回编码后的数据
 * 5. 实现 isReceiveComplete，判断当前数据包是否接收完整
 * 6. 暴露出 rpc-client
 */

const EasySock = require('easy_sock')
const protoBuf = require('protocol-buffers')
const fs = require('fs')
const schemas = protoBuf(fs.readFileSync(`${__dirname}/../schema/comment.proto`))

const easySock = new EasySock()
easySock.setConfig({
  ip: '127.0.0.1',
  port: 4001,
  keepAlive: true,
  timeout: 500
})

easySock.isReceiveComplete = function (buffer) {
  if (buffer.length < 8) return 0
  let len
  const bodyLength = buffer.readInt32BE(4)
  if (buffer.length >= bodyLength + 8) {
    len = bodyLength + 8
  } else {
    len = 0
  }

  return len
}

easySock.encode = function (data, seq) {
  const body = schemas.CommentListRequest.encode(data)
  const head = Buffer.alloc(8)
  head.writeInt32BE(seq)
  head.writeInt32BE(body.length, 4)

  return Buffer.concat([head, body])
}

easySock.decode = function (buffer) {
  const seq = buffer.readInt32BE()
  const body = buffer.slice(8)
  const result = schemas.CommentListResponse.decode(body)
  return {
    seq,
    result
  }
}

module.exports = easySock