const socket = io();
const loginDiv = document.getElementById("login");
const chatDiv = document.getElementById("chat");
const nameInput = document.getElementById("name");
const numInput = document.getElementById("num");
const msgInput = document.getElementById("msg");
const msgsDiv = document.getElementById("msgs");
const welcome = document.getElementById("welcome");

function login() {
  const name = nameInput.value;
  const number = numInput.value;
  if (!name || !number) return alert("Please fill all fields.");
  socket.emit('login', { name, number });
}

socket.on('loggedin', user => {
  welcome.innerText = `🕊️ Hello, ${user.name}`;
  loginDiv.style.display = 'none';
  chatDiv.style.display = 'block';
});

function send() {
  const msg = msgInput.value;
  if (msg.trim() === "") return;
  socket.emit('chat', msg);
  msgInput.value = "";
}

socket.on('chat', data => {
  const entry = document.createElement('div');
  entry.innerHTML = `<strong>${data.user.name}:</strong> ${data.msg}`;
  msgsDiv.appendChild(entry);
  msgsDiv.scrollTop = msgsDiv.scrollHeight;
});
