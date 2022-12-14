import { Router } from 'express';
import {
    createPlayer,
    getAllPlayers,
    getPlayer,
    removePlayer,
    updatePlayer,
    allPlayersWithInstruments,
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

router.get('/instruments', async (req, res) => {
    const { limit = 100, skip = 0 } = req.query;
    const result = await allPlayersWithInstruments(req.db, limit, skip);

    res.json(result.length
        ? {
            message: 'Thats all players with instruments',
            data: result,
        }
        : 'Do not have players with instruments in this database');
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

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changeData = Object.entries(req.body)
        .filter(([k]) => ['name', 'ganre', 'instrument_id']
            .includes(k));

    if (!changeData.length) {
        res.json('Do not have data to update!');
        return;
    }

    const realyData = Object.fromEntries(changeData);

    const result = await updatePlayer(req.db, id, realyData);

    // const changeData = req.body;

    // if (!Object.entries(changeData).length) {
    //     res.json('Do not have data to update!');
    //     return;
    // }

    // const result = await updatePlayer(req.db, id, changeData);

    res.json({
        message: result
            ? 'This player was update'
            : `Do not have player with id: ${id}`,
        data: result,
    });
});

export const playersController = router;
