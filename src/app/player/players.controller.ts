import { Router } from 'express';
import { createPlayer, getPlayer } from './players.service';

const router = Router();

router.post('/', async (req, res) => {
    const player = req.body;
    const result = await createPlayer(req.db, player);

    res.json({
        message: 'This player was create',
        data: result,
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await getPlayer(req.db, id);

    res.json({
        message: result
            ? 'Thats is your player'
            : `Do not have player with id: ${id}`,
        data: result,
    });
});

export const playersController = router;
