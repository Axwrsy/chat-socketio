//const é um modo de declarar variaveis em que o valor naopode ser alterado
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const mensagens = document.getElementById('mensagens');

const meuId = Math.random().toString(36).substr(2, 9); // Id aleatório do usuário

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // envia a mensagem com o ID do remetente
    socket.emit('mensagem', { id: meuId, texto: input.value });
    input.value = '';
  }
});

socket.on('mensagem', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg.texto;

  // se a msg foi enviada por mim, vai ficar alinhada a direita
  if (msg.id == meuId ){
    item.classList.add('mensagem-direita');
  } else {
    item.classList.add('mensagem-esquerda');
  }
  
  mensagens.appendChild(item);
});
