const net = require('net');

const socket = new net.Socket()

socket.connect({
  host: '127.0.0.1',
  port: '4000'
}, () => {
  console.log('已连接到服务器');
  socket.write('hello socket')
})

