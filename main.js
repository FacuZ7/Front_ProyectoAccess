import './style.css'
import io from 'socket.io-client'

const socket = io('http://localhost:8080') //el puerto donde esta mi servidor y mis sockets del servidor.

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value) {
    const item = document.createElement("li");
    item.classList.add('chat_message');
    const logo = document.createElement("div");
    logo.classList.add('chat_user_icon');
    item.appendChild(logo);
    const itemTxt = document.createElement('div');
    itemTxt.classList.add('chat_message_content');
    itemTxt.innerText = input.value;
    item.appendChild(itemTxt);
    messages.appendChild(item);
    //socket emit escucha el evento chat message y envia el mensaje del usuario hacia el servidor.
    console.log('Segundo paso: El usuario envia su mensaje:',input.value); //este console log se ve en la consola del navegador! estamos del lado del cliente
    //socket.emit("chat message", input.value);
    
    input.value = "";
  }
});

