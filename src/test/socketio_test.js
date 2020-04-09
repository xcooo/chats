//	引入客户端 io
import io from 'socket.io-client'

// 连接服务器, 得到与服务器的连接对象
const socket = io('ws://localhost:4000')

// 客户端接收服务器的数据
socket.on('receiveMsg', function(data) {
  console.log('客户端接收服务器的数据', data);
})

// 客户端向服务端发送消息
socket.emit('sendMsg', {name: 'xcooo'})
console.log('客户端向服务端发送消息', {name: 'xcooo'});