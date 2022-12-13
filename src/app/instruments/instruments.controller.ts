import { Router } from 'express';
import { createInstrument } from './instruments.service';

const router = Router();

router.post('/', async (req, res) => {
    const instrument = req.body;
    const result = await createInstrument(req.db, instrument);

    res.json({
        message: 'This instrument was create',
        data: result,
    });
});

export const instrumentsController = router;
