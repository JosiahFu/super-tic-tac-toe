// server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let connections = [];
let storedData = null;

io.on('connection', (socket) => {
    console.log('A client connected.');
    connections.push(socket);
    socket.emit('data', storedData)
    // socket.emit('response', {'status': 'Connected'});

    socket.on('message', (data) => {
        console.log('Received message:', data);
        storedData = data;

        // Process the received message here...
        connections.forEach(e => {
            e.emit('response', storedData)
        });

        // Send a response back to the client
    });

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('A client disconnected.');
    });
});

server.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
});
