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
  sendId();
})

// 1. 向服务端发送随机id
// 2. 等待服务端返回名称再发送随机id

// 全双工通信
// 给请求和返回包都添加包号

let seq = 0;
function sendId() {
  seq++;
  const lessonId = lessonids[Math.floor(Math.random() * lessonids.length)]
  console.log(`${seq}: ${lessonId}`);
  const buffer = Buffer.alloc(6)
  buffer.writeInt16BE(seq)
  buffer.writeInt32BE(lessonId, 2)
  socket.write(buffer)
}

socket.on('data', (buf) => {
  console.log(buf.toString());
})

setInterval(sendId, 50)

