import Express from 'express';
import { WebSocketServer } from 'ws';
import path from 'path';
import morgan from 'morgan';
import compression from 'compression';
import fs from 'fs';
import { randomUUID } from 'crypto';
import ApiRouter from './routes/router.js';

const __dirname = path.resolve();

if (!fs.existsSync('./configs')) {
    fs.mkdirSync('./configs');
}

const app = Express();

// WebSocket server
const wss = new WebSocketServer({ noServer: true });
wss.on('connection', (ws) => {
    ws.id = randomUUID();
    ws.on('message', (msg) => {
        const { type, payload } = JSON.parse(msg);
        switch (type) {
            case 'update-config':
                app.locals.setConfig(payload, ws.id);
                break;
            default:
                break;
        }
        if (type) {
            console.log(`Received message => ${type}`);
        }
    });
    ws.send(
        JSON.stringify({
            type: 'config',
            payload: { name: app.locals.name, config: app.locals.config },
        })
    );
});

wss.broadcastConfig = (ignoreClient = null) => {
    wss.clients.forEach((client) => {
        if (client.id !== ignoreClient) {
            client.send(
                JSON.stringify({
                    type: 'config',
                    payload: { name: app.locals.name, config: app.locals.config },
                })
            );
        }
    });
};

// Locals
app.locals.config = [];
app.locals.setConfig = (config, ignoreClient = null) => {
    app.locals.config = config;
    wss.broadcastConfig(ignoreClient);
};
app.locals.name = null;
app.locals.setName = (name, ignoreClient = null) => {
    app.locals.name = name;
    wss.broadcastConfig(ignoreClient);
};

// Middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(compression());

// Routes
app.use('/api', ApiRouter);
app.use('/configs', Express.static(path.join(__dirname, 'configs')));
app.use('/static', Express.static('C:'));
app.use(Express.static(path.resolve(__dirname, './client')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client', 'index.html'));
});

export { app, wss };
