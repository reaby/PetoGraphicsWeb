import { app, wss } from './app.js';
import open from 'open';

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

open('http://localhost:5000');
