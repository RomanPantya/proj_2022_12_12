import { Router } from 'express';
import { createPlayer } from './players.service';

const router = Router();

router.post('/', async (req, res) => {
    const player = req.body;
    const result = await createPlayer(req.db, player);

    res.json({
        message: 'This player was create',
        data: result,
    });
});

export const playersController = router;
