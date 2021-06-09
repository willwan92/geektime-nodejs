const net = require('net');
const socket = new net.Socket()

const lessonids = [
  "136797",
  "136798",
  "136799",
  "136800",
  "136801",
  "136803",
  "136804",
  "136806",
  "136807",
  "136808",
  "136809",
  "141994",
  "143517",
  "143557",
  "143564",
  "143644",
  "146470",
  "146569",
  "146582"
]

socket.connect({
  host: '127.0.0.1',
  port: '4000'
}, () => {
  console.log('已连接到服务器');
})

// 发送数据包, TCP协议会把短时间内发的包拼在一起
for (let seq = 0; seq < 100; seq ++) {
  const id = lessonids[Math.floor(Math.random() * lessonids.length)]
  socket.write(encode({ id, seq }))
}

/**
 * 把数据编码成二进制数据包
 * @param {*} param0 
 * @returns 
 */
function encode({ id, seq }) {
  const bodyBuffer = Buffer.alloc(4)
  bodyBuffer.writeInt32BE(id)
  
  const headBuffer = Buffer.alloc(6)
  headBuffer.writeInt16BE(seq)
  // 由于分包的时候需要知道一个完整包的包长，一般把数据包的包长写在包头里
  headBuffer.writeInt32BE(bodyBuffer.length, 2)
  
  return Buffer.concat([headBuffer, bodyBuffer])
}

/**
 * 解码二进制数据包
 * @param {*} buffer 
 * @returns 
 */
 function decode(buffer) {
  const seq = buffer.readInt16BE()
  const title = buffer.slice(6).toString()

  return { seq, title }
}

/**
 * 检查是否是完成的包，返回第一个完成数据包的包长
 * @param {*} buffer 
 * @returns 包长
 */
 function checkComplete(buffer) {
  if(buffer.length < 6) {
    // 因为包头长为6，所以如果包长小于6肯定不是一个完成的数据包
    return 0;
  }

  const bodyLength = buffer.readInt32BE(2)
  return 6 + bodyLength
}

/**
 * 由于接收到的数据包可能是多个包拼接起来的，在接收到数据包之后需要：
 * 1. 先把数据包按包长切分开
 * 2. 解包
 * 3. 根据数据包参数获取对应的章节title
 * 4. 返回给客户端
 */
let olderBuffer = null
let packageLength
let package
socket.on('data', (buffer) => {
  olderBuffer && (buffer = Buffer.concat([olderBuffer, buffer]))
  while(bufferLength = checkComplete(buffer)) {
    console.log(bufferLength);
    package = buffer.slice(0, packageLength)
    package = decode(package)
    buffer = buffer.slice(packageLength)
    console.log(package);
  }
  olderBuffer = buffer
 })

