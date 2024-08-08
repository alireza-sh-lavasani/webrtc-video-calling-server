// server/src/index.ts
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3001;

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast received message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.send(JSON.stringify({ message: 'Hello from server' }));
});

app.get('/', (req, res) => {
  res.send(`Server is running on port ${PORT}`)
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
