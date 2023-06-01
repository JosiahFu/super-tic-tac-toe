import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import httpProxy from 'http-proxy';

const app = express();
const server = createServer(app);
const io = new Server(server);
const proxy = httpProxy.createProxyServer();

// Object to store multiple states
let state;

// Socket.io connection event
io.on('connection', socket => {
    console.log('A client connected.');

    // Send all the states to the newly connected client
    if (state !== undefined) {
        socket.emit('state-update', state);
    }

    // Event listener for state updates from clients
    socket.on('update-state', data => {
        state = data;
        // Broadcast the updated state to all connected clients except the sender
        socket.broadcast.emit('state-update', state);
    });

    // Socket.io disconnection event
    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
});

// Forward other traffic to port 8080
app.all('*', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:8080' });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
