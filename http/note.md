# buffer

二进制数据的编解码

## buffer 的创建

Buffer.from()
Buffer.alloc()

## buffer 的读写

原生nodejs有很多读写buffer的函数。写的方式分为大端和小端

问题：使用原生js读写buffer很繁琐，因此就出现的一些buffer的读写库

## buffer的读写库

protocol buffer: google 开发的js buffer 库，兼容前端

protocol-buffers：Protocol Buffers for Node.js，npm包地址：https://www.npmjs.com/package/protocol-buffers

上手练习buffer的读写，分别使用原生方法和protocol-buffers库