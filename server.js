const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// servir arquivos da pasta public
app.use(express.static('public'));

// evento de conexão socket
io.on('connection', (socket) => {
  console.log('um usuário se conectou');

  socket.on('mensagem', (msg) => {
    io.emit('mensagem', msg); // envia para todos os clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('um usuário se desconectou');
  });
});

// inicia o servidor
//pra duas pessoas conseguirem entrar é necessario o (cliente) entrar pelo ip da maquina, exemplo:
//http://10.148.155.49:5000
server.listen(5000, '0.0.0.0', () => {
  console.log('servidor rodando em http://localhost:5000');
});
