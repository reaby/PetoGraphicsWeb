import Express from 'express';
import fs, { promises as fsp } from 'fs';
import multer from 'multer';

const router = Express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./configs/${req.app.locals.project}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/files', async (req, res) => {
    const files = await fsp.readdir(`./configs/${req.app.locals.project}`, { withFileTypes: true });
    const filenames = files.map((file) => file.name);
    res.status(200);
    res.send(filenames);
});

router.post('/files', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400);
        res.send('Missing "file" from body');
        return;
    }
    res.status(201);
    res.send(file);
});

router.delete('/files/:file', async (req, res) => {
    const file = req.params.file;

    if (!fs.existsSync(`./configs/${req.app.locals.project}/${file}`)) {
        res.status(404);
        res.send('File not found');
        return;
    }

    try {
        await fsp.unlink(`./configs/${req.app.locals.project}/${file}`);
        res.sendStatus(200);
    } catch(error) {
        res.status(409);
        res.send(error);
    }
});

router.all(['/files', '/files/:file'], (req, res) => res.sendStatus(405));

export default router;
