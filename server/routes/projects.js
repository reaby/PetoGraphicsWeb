import Express from 'express';
import fs, { promises as fsp } from 'fs';

const router = Express.Router();

router.get('/projects', async (req, res) => {
    const files = await fsp.readdir('./configs', { withFileTypes: true });
    const projects = files.filter((file) => file.isDirectory()).map((file) => file.name);
    res.status(200);
    res.json(projects);
});

router.get('/projects/:project', async (req, res) => {
    const project = req.params.project;

    if (!fs.existsSync(`./configs/${project}`)) {
        res.status(404);
        res.send(`Project with name "${project}" does not exist.`);
        return;
    }

    try {
        const data = await fsp.readFile(`./configs/${project}/config.json`);
        const config = JSON.parse(data);
        res.status(200);
        res.send({ project, config });
    } catch (error) {
        console.log(error);
        res.status(409);
        res.send('Failed to read config');
    }
});

router.post('/projects', async (req, res) => {
    const newProject = req.body.project;

    if (!newProject) {
        res.status(400);
        res.send('Missing "project" from body');
        return;
    }

    try {
        await fsp.mkdir(`./configs/${newProject}`);
        await fsp.writeFile(`./configs/${newProject}/config.json`, '[]');
        req.app.locals.setProject(newProject);
        req.app.locals.setConfig([]);
        res.status(200);
        res.send({ project: newProject, config: [] });
    } catch (error) {
        console.log(error);
        res.status(409);
        res.send('Failed to create project');
    }
});

router.put('/projects/:project', async (req, res) => {
    const project = req.params.project;
    const config = req.body.config;

    if (!config) {
        res.status(400);
        res.send('Missing "config" from body');
        return;
    }

    try {
        await fsp.writeFile(`./configs/${project}/config.json`, JSON.stringify(config));
        res.status(200);
        res.send({ project, config });
    } catch(error) {
        res.status(409);
        res.send('Failed to update config');
    }
});

router.delete('/projects/:project', async (req, res) => {
    const project = req.params.project;

    try {
        await fsp.rm(`./configs/${project}`, { recursive: true, force: true });
        if (project === req.app.locals.project) {
            req.app.locals.setProject(null);
            req.app.locals.setConfig([]);
        }
        res.sendStatus(200);
    } catch(error) {
        res.status(409);
        res.send('Failed to remove project');
    }
});

router.post('/projects/change', async (req, res) => {
    const newProject = req.body.project;

    if (!newProject) {
        res.status(400);
        res.send('Missing "project" from body');
        return;
    }
    if (!fs.existsSync(`./configs/${newProject}/config.json`)) {
        res.status(404);
        res.send('Project not found');
        return;
    }

    if (newProject === req.app.locals.project) {
        res.status(200);
        res.send({ project: req.app.locals.project, config: req.app.locals.config });
        return;
    }

    try {
        const data = await fsp.readFile(`./configs/${newProject}/config.json`);
        const newConfig = JSON.parse(data);
        req.app.locals.setProject(newProject);
        req.app.locals.setConfig(newConfig);
        res.status(200);
        res.send({ project: newProject, config: newConfig });
    } catch(error) {
        res.status(409);
        res.send('Failed to load project');
    }
});

export default router;
