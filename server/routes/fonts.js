import Express from 'express';
import SystemFonts from 'system-font-families';

const router = Express.Router();

router.get('/fonts', (req, res) => {
    const systemFonts = new SystemFonts.default();
    const fontList = systemFonts.getFontsExtendedSync();
    res.status(200);
    res.send(fontList);
});

router.all('/fonts', (req, res) => res.sendStatus(405));

export default router;
