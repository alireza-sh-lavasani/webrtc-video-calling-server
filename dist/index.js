"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/src/index.ts
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server });
const PORT = process.env.PORT || 3001;
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast received message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws_1.default.OPEN) {
                client.send(message.toString());
            }
        });
    });
    ws.send(JSON.stringify({ message: 'Hello from server' }));
});
app.get('/', (req, res) => {
    res.send(`Server is running on port ${PORT}`);
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
