import { Router } from 'express';
import { validateCard } from '../controllers/card';

const router = Router();

router.post('/validate', validateCard);

export default router;
