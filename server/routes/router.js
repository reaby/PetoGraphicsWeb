import Express from 'express';
import fontRouter from './fonts.js';
import fileRouter from './files.js';
import projectRouter from './projects.js';

const router = Express.Router();

router.use(projectRouter);
router.use(fileRouter);
router.use(fontRouter);

export default router;
