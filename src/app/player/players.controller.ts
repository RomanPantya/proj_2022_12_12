import { Router } from 'express';
import {
    createPlayer, getPlayer, getAllPlayers, removePlayer,
} from './players.service';

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

router.get('/', async (req, res) => {
    const result = await getAllPlayers(req.db);
    res.json(result.length
        ? {
            message: 'Thats all players in this database',
            data: result,
        }
        : 'Do not have players in this database');
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await removePlayer(req.db, id);

    res.json({
        message: result
            ? 'This player was delete'
            : `Do not have player with id: ${id}`,
        data: result,
    });
});

export const playersController = router;
