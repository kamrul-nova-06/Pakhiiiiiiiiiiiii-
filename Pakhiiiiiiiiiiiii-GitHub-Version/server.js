const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const sessions = {};

io.on('connection', socket => {
  const ip = socket.handshake.address;
  if (!sessions[ip]) sessions[ip] = {};

  socket.on('login', data => {
    sessions[ip] = data;
    socket.emit('loggedin', sessions[ip]);
  });

  socket.on('chat', msg => {
    const user = sessions[ip] || { name: "Anonymous" };
    io.emit('chat', { user, msg });
  });
});

http.listen(3000, () => console.log('Server running on http://localhost:3000'));
