/**
 * 创建socket客户端
 */

const EasySock = require('easy_sock')
const protobuf = require('protocol-buffers')
const fs = require('fs')
const schemas = protobuf(fs.readFileSync(`${__dirname}/detail.proto`))

const client = new EasySock()
client.setConfig({
  ip : "127.0.0.1",
  port : 4000,	
  keepAlive : true,	
  timeout : 500
})

client.isReceiveComplete = function(buffer) {
  if (buffer.length < 8) return 0
  const bodyLength = buffer.readInt32BE(4)
  if (buffer.length >= (bodyLength + 8)) {
    return bodyLength + 8
  } else {
    return 0
  }
}

client.encode = function(data, seq) {
  const body = schemas.ColumnRequest.encode(data)
  let head = Buffer.alloc(8)
  head.writeInt32BE(seq)
  head.writeInt32BE(body.length, 4)

  return Buffer.concat([head, body])
}

client.decode = function(buffer) {
  const seq = buffer.readInt32BE()
  const body = buffer.slice(8)
  return {
    seq,
    result: schemas.ColumnResponse.decode(body)
  }
}

module.exports = client