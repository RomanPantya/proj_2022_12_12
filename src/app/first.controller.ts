import { Router } from 'express';
import { firstFunction } from './first.service';

const router = Router();

router.get('/', (_, res) => {
    const result = firstFunction();
    res.json(result);
});

export const firstController = router;
