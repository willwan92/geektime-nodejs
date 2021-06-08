const net = require('net');

const server = net.createServer((socket) => {
  console.log('客户端已连接');
  socket.on('data', (buf) => {
    console.log(buf.toString());
  })
})

server.listen({
  host: '127.0.0.1',
  port: 4000
}, () => {
  console.log('服务器已启动');
})