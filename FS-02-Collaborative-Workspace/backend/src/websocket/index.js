const registerSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    socket.on('join-room', (roomId) => {
      if (roomId) socket.join(roomId);
    });

    socket.on('cursor-move', ({ roomId, cursor }) => {
      if (roomId && cursor) {
        socket.to(roomId).emit('cursor-move', cursor);
      }
    });

    socket.on('document-change', ({ roomId, change }) => {
      if (roomId && change) {
        socket.to(roomId).emit('document-change', change);
      }
    });
  });
};

module.exports = { registerSocketHandlers };
