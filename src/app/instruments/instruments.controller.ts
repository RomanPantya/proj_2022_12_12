import { Router } from 'express';
import {
    createInstrument, getOneInstrument,
    getAllInstruments, removeInstrument,
} from './instruments.service';

const router = Router();

router.post('/', async (req, res) => {
    const instrument = req.body;
    const result = await createInstrument(req.db, instrument);

    res.json({
        message: 'This instrument was create',
        data: result,
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getOneInstrument(req.db, id);

    res.json({
        message: result ? 'Thats is this instrument'
            : `Do not have instrument with id: ${id}`,
        data: result,
    });
});

router.get('/', async (req, res) => {
    const result = await getAllInstruments(req.db);

    res.json(result.length
        ? {
            message: 'Thats all instruments',
            data: result,
        }
        : 'Do not have instruments in this database');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await removeInstrument(req.db, id);

    res.json({
        message: result
            ? 'This instrument was delete'
            : `Do not have instrument with this id: ${id}`,
        data: result,
    });
});

export const instrumentsController = router;
