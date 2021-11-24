import Express from 'express';
import fs from 'fs';
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

router.get('/files', (req, res) => {
    const files = fs.readdirSync(`./configs/${req.app.locals.project}`, { withFileTypes: true }).map((file) => file.name);
    res.status(200);
    res.send(files);
});

router.post('/files', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        res.status(400);
        res.send('Missing "file" from body');
        return;
    }
    res.status(200);
    res.send(file);
});

router.delete('/files', (req, res) => {
    const file = req.body.file;
    if (!file) {
        res.status(400);
        res.send('Missing "file" from body');
    }
    fs.unlink(`./configs/${req.app.locals.project}/${file}`, (err) => {
        if (err) {
            res.status(409);
            res.send('Failed to remove file');
            return;
        }
        res.send(200);

    });
});

export default router;
