require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://study-buddy-opal.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/battles', require('./routes/battles'));
app.use('/api/doubts', require('./routes/doubts'));

app.get('/', (req, res) => res.json({ status: 'Study Buddy API running' }));

// Socket.io
const onlineUsers = {};

io.on('connection', (socket) => {
  socket.on('user:online', (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit('users:online', Object.keys(onlineUsers));
  });

  // DM
  socket.on('dm:send', async ({ from, fromUsername, to, toUsername, text }) => {
    try {
      const msg = await Message.create({ from, fromUsername, to, toUsername, text, type: 'dm' });
      const toSocket = onlineUsers[to];
      if (toSocket) io.to(toSocket).emit('dm:receive', msg);
      socket.emit('dm:receive', msg);
    } catch (e) { console.error(e); }
  });

  // Group chat
  socket.on('group:join', (groupId) => socket.join(`group:${groupId}`));
  socket.on('group:send', async ({ from, fromUsername, groupId, text }) => {
    try {
      const msg = await Message.create({ from, fromUsername, groupId, text, type: 'group' });
      io.to(`group:${groupId}`).emit('group:receive', msg);
    } catch (e) { console.error(e); }
  });

  // Battle room
  socket.on('battle:join', (battleId) => socket.join(`battle:${battleId}`));
  socket.on('battle:update', (data) => io.to(`battle:${data.battleId}`).emit('battle:updated', data));

  // Test room
  socket.on('test:join', (testId) => socket.join(`test:${testId}`));
  socket.on('test:update', (data) => io.to(`test:${data.testId}`).emit('test:updated', data));

  socket.on('disconnect', () => {
    for (const [uid, sid] of Object.entries(onlineUsers)) {
      if (sid === socket.id) { delete onlineUsers[uid]; break; }
    }
    io.emit('users:online', Object.keys(onlineUsers));
  });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log('MongoDB connected'); server.listen(PORT, () => console.log(`Server on port ${PORT}`)); })
  .catch(e => { console.error('DB error:', e.message); server.listen(PORT, () => console.log(`Server on port ${PORT} (no DB)`)); });
