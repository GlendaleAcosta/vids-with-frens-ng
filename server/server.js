const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// const expressStaticGzip = require("express-static-gzip");
// var compression = require('compression')
dotenv.load({ path: '.env' });

const PORT = process.env.PORT || 3201;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Middleware
// app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '../app-client')));
app.use(express.static(path.join(__dirname, '../dist')));

// Controllers
const roomCtrl = require('./controllers/roomCtrl');

// Routes
app.post('/api/room', roomCtrl.post);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// socket.io
let videoIds = {};
io.on('connection', function(socket){
  const clientId = socket.id;
  const roomId = socket.handshake.query.roomId;
  
  socket.join(roomId, (test) => {
    
    socket.emit('current video', videoIds[roomId] || 'fzQ6gRAEoy0');
  })

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  
  socket.on('change video', (video, fn) => {
    videoIds[roomId] = video;
    io.to(roomId).emit('current video', videoIds[roomId])
  })
  
  socket.on('play video', (time) => {
    // console.log(`played video at ${time}`);
    io.to(roomId).emit('play video', {
      playing: true,
      fromServer: true,
      time: time,
    });
  })

  socket.on('pause video', function(time){
    io.to(roomId).emit('pause video', {
      playing: false,
      fromServer: true,
      time: time,
    })
  })


  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.leave(roomId);
  });
});

// Server
http.listen(PORT, () => {
  console.log(`App is up on port ${PORT}`);
});
