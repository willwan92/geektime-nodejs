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

function sendId() {
  let lessonId = lessonids[Math.floor(Math.random() * lessonids.length)]
  socket.write(lessonId)
}

socket.on('data', (buf) => {
  console.log(buf.toString());
  sendId();
})

