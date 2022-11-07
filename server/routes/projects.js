import Express from 'express';
import fs, { promises as fsp } from 'fs';

const router = Express.Router();

router.get('/projects', async (req, res) => {
    try {
        const files = await fsp.readdir('./configs', { withFileTypes: true });
        const projects = files.filter((file) => file.isDirectory()).map((file) => file.name);
        res.status(200);
        res.json(projects);
    } catch (error) {
        res.status(409);
        res.send('Failed to get projects');
    }
});

router.get('/projects/:name', async (req, res) => {
    const name = req.params.name;

    if (!fs.existsSync(`./configs/${name}`)) {
        res.status(404);
        res.send(`Project with name "${name}" does not exist.`);
        return;
    }

    try {
        const data = await fsp.readFile(`./configs/${name}/config.json`);
        const config = JSON.parse(data);
        res.status(200);
        res.send({ name, config });
    } catch (error) {
        res.status(409);
        res.send('Failed to read config');
    }
});

router.post('/projects', async (req, res) => {
    const name = req.body.name;

    if (!name) {
        res.status(400);
        res.send('Missing "name" from body');
        return;
    }

    try {
        await fsp.mkdir(`./configs/${name}`);
        await fsp.writeFile(`./configs/${name}/config.json`, '[]');
        res.status(201);
        res.send({ name, config: [] });
    } catch (error) {
        res.status(409);
        res.send('Failed to create project');
    }
});

router.put('/projects/:name', async (req, res) => {
    const name = req.params.name;
    const config = req.body.config;

    if (!config) {
        res.status(400);
        res.send('Missing "config" from body');
        return;
    }

    try {
        await fsp.writeFile(`./configs/${name}/config.json`, JSON.stringify(config));
        res.status(200);
        res.send({ name, config });
    } catch (error) {
        res.status(409);
        res.send('Failed to update config');
    }
});

router.delete('/projects/:name', async (req, res) => {
    const name = req.params.name;

    try {
        await fsp.rm(`./configs/${name}`, { recursive: true, force: true });
        if (name === req.app.locals.name) {
            req.app.locals.setName(null);
            req.app.locals.setConfig([]);
        }
        res.sendStatus(200);
    } catch (error) {
        res.status(409);
        res.send('Failed to remove project');
    }
});

router.post('/projects/change', async (req, res) => {
    const name = req.body.name;

    if (!name) {
        res.status(400);
        res.send('Missing "name" from body');
        return;
    }
    if (!fs.existsSync(`./configs/${name}/config.json`)) {
        res.status(404);
        res.send('Project not found');
        return;
    }

    if (name === req.app.locals.name) {
        res.status(200);
        res.send({ name: req.app.locals.name, config: req.app.locals.config });
        return;
    }

    try {
        const data = await fsp.readFile(`./configs/${name}/config.json`);
        const newConfig = JSON.parse(data);
        req.app.locals.setName(name);
        req.app.locals.setConfig(newConfig);
        res.status(200);
        res.send({ name, config: newConfig });
    } catch (error) {
        res.status(409);
        res.send('Failed to load project');
    }
});

router.all(['/projects', '/projects/:project', '/projects/change'], (req, res) =>
    res.sendStatus(405)
);

export default router;
