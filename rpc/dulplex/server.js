const net = require('net');

// 1. 接收客户端Id，根据id找到对应章节名称
// 2. 把章节id和名称发送给客户端

const data = {
  136797: "01 | 课程介绍",
  136798: "02 | 内容综述",
  136799: "03 | Node.js是什么？",
  136800: "04 | Node.js可以用来做什么？",
  136801: "05 | 课程实战项目介绍",
  136803: "06 | 什么是技术预研？",
  136804: "07 | Node.js开发环境安装",
  136806: "08 | 第一个Node.js程序：石头剪刀布游戏",
  136807: "09 | 模块：CommonJS规范",
  136808: "10 | 模块：使用模块规范改造石头剪刀布游戏",
  136809: "11 | 模块：npm",
  141994: "12 | 模块：Node.js内置模块",
  143517: "13 | 异步：非阻塞I/O",
  143557: "14 | 异步：异步编程之callback",
  143564: "15 | 异步：事件循环",
  143644: "16 | 异步：异步编程之Promise",
  146470: "17 | 异步：异步编程之async/await",
  146569: "18 | HTTP：什么是HTTP服务器？",
  146582: "19 | HTTP：简单实现一个HTTP服务器"
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
 * 把数据编码成二进制数据包
 * @param {*} param0 
 * @returns 
 */
 function encode({ seq, title }) {
  const bodyBuffer = Buffer.from(title)
  
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
  const id = buffer.readInt32BE(6)

  return { id, seq }
}


/**
 * 由于接收到的数据包可能是多个包拼接起来的，在接收到数据包之后需要：
 * 1. 先把数据包按包长切分开
 * 2. 解包
 * 3. 根据数据包参数获取对应的章节title
 * 4. 返回给客户端
 * 5. 继续处理剩下的数据包
 */
let olderBuffer = null
const server = net.createServer((socket) => {
  console.log('客户端已连接');
  let packageLength
  let package
  socket.on('data', (buffer) => {
    olderBuffer && (buffer = Buffer.concat([olderBuffer, buffer]))
    while(packageLength = checkComplete(buffer)) {
      package = buffer.slice(0, packageLength)
      package = decode(package)
      buffer = buffer.slice(packageLength)
      socket.write(encode({ seq: package.seq, title: data[package.id] }))
    }
    olderBuffer = buffer
  })
})

server.listen({
  host: '127.0.0.1',
  port: 4000
}, () => {
  console.log('服务器已启动');
})