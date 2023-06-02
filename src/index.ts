import express from 'express';
import { createServer } from 'http';
import httpProxy from 'http-proxy';
import { initializeSocket } from './gameManager';

const app = express();
const server = createServer(app);
const proxy = httpProxy.createProxyServer();

initializeSocket(server);

// Forward other traffic to port 8080 if flag is present
const shouldForward = process.argv.includes('--forward');

if (shouldForward) {
    app.all('*', (req, res) => {
        proxy.web(req, res, { target: 'http://localhost:8080' });
    });
} else {
    app.use(express.static('public'));
}

// Start the server
const port = process.argv.includes('-p') ? Number(process.argv[process.argv.indexOf('-p') + 1]) : 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
