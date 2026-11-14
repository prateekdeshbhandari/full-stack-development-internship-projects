require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Collaborative workspace backend is healthy.',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    if (roomId) {
      socket.join(roomId);
    }
  });

  socket.on('presence-update', ({ roomId, user }) => {
    if (roomId) {
      socket.to(roomId).emit('presence-update', user);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

server.listen(PORT, () => {
  console.log(`Collaborative workspace API running on http://localhost:${PORT}`);
});

module.exports = { app, server, io };
