import Express from 'express';
import { WebSocketServer } from 'ws';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import morgan from 'morgan';
import fs from 'fs';
import ApiRouter from './api.js';

const port = process.env.PORT || 5000;
const __dirname = path.resolve();
if (!fs.existsSync('./configs')) {
    fs.mkdir('./configs');
}

const app = Express();

// WebSocket server
const wss = new WebSocketServer({ noServer: true });
wss.on('connection', (ws) => {
    ws.id = uuidv4();
    ws.on('message', ({ type, payload }) => {
        switch (type) {
            case 'update-config':
                app.locals.setConfig(payload);
                break;
            default:
                break;
        }
        if (type) {
            console.log(`Received message => ${type}`);
        }
    });
    ws.send(JSON.stringify({ type: 'config', payload: { project: app.locals.project, config: app.locals.config } }));
});

wss.broadcastConfig = (ignoreClient = null) => {
    wss.clients.forEach((client) => {
        if (client.id !== ignoreClient) {
            client.send(JSON.stringify({ type: 'config', payload: { project: app.locals.project, config: app.locals.config } }));
        }
    });
};

// Main app
app.locals.config = [];
app.locals.setConfig = (config, ignoreClient = null) => {
    app.locals.config = config;
    wss.broadcastConfig(ignoreClient);
};
app.locals.project = null;
app.locals.setProject = (project, ignoreClient = null) => {
    app.locals.project = project;
    wss.broadcastConfig(ignoreClient);
};

// Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// Routes
app.use('/api/', ApiRouter);
app.use('/static', Express.static(path.join(__dirname, 'configs')));
app.get('*', (req, res) => {
    res.send(404);
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});
