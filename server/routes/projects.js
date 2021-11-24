import Express from 'express';
import fs from 'fs';

const router = Express.Router();

router.get('/projects', (req, res) => {
    const projects = fs.readdirSync('./configs', { withFileTypes: true })
        .filter((file) => file.isDirectory())
        .map((file) => file.name);
    res.status(200);
    res.json(projects);
});

router.get('/projects/:project', (req, res) => {
    const project = req.params.project;

    if (!project) {
        res.status(400);
        res.send('Missing "project" from body');
        return;
    }
    if (!fs.existsSync(`./configs/${project}`)) {
        res.status(404);
        res.send(`Project with name "${project}" does not exist.`);
        return;
    }

    fs.readFile(`./configs/${project}/config.json`, (err, data) => {
        if (err) {
            res.status(409);
            res.send('Failed to read config');
            return;
        }
        const config = JSON.parse(data);
        res.status(200);
        res.json({ project, config });
    });
});

router.post('/projects', (req, res) => {
    const newProject = req.body.project;

    if (!newProject) {
        res.status(400);
        res.send('Missing "project" from body');
        return;
    }

    fs.mkdir(`./configs/${newProject}`, (err) => {
        if (err) {
            res.status(409);
            res.send('Failed to create project');
            return;
        }
        console.log('Make dir');
        fs.writeFile(`./configs/${newProject}/config.json`, '[]', (err) => {
            if (err) {
                res.status(409);
                res.send('Failed to create project config');
                return;
            }
            req.app.locals.setProject(newProject);
            req.app.locals.setConfig([]);
            console.log('Make config');
            res.status(200);
            res.send({ project: newProject, config: [] });
        });
    });
});

router.put('/projects/:project', (req, res) => {
    const project = req.params.project;
    const config = req.body.config;

    if (!project) {
        res.status(400);
        res.send('Missing project from url');
        return;
    }

    if (!config) {
        res.status(400);
        res.send('Missing "config" from body');
        return;
    }

    fs.writeFile(`./configs/${project}/config.json`, JSON.stringify(config), (err) => {
        if (err) {
            res.status(409);
            res.send('Failed to update config');
            return;
        }
        res.status(200);
        res.send({ project, config });
    });
});

router.delete('/projects', (req, res) => {
    const project = req.body.project;

    if (!project) {
        res.status(400);
        res.send('Missing "project" from body');
        return;
    }

    fs.rm(`./configs/${project}`, { recursive: true, force: true }, (err) => {
        if (err) {
            res.status(409);
            res.send('Failed to remove project');
            return;
        }
        if (project === req.app.locals.project) {
            req.app.locals.setProject(null);
            req.app.locals.setConfig([]);
        }
        res.send(200);
    });
});

router.post('/projects/change', (req, res) => {
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

    fs.readFile(`./configs/${newProject}/config.json`, (err, data) => {
        if (err) {
            res.send(409);
            throw err;
        }
        const newConfig = JSON.parse(data);
        req.app.locals.setProject(newProject);
        req.app.locals.setConfig(newConfig);
        res.status(200);
        res.send({ project: newProject, config: newConfig });
    });
});

export default router;
