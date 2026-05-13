import { Router } from 'express';
import { getCompoundInterest } from '../controllers/calculatorController';

const router = Router();

router.post('/compound-interest', getCompoundInterest); // ¡Nueva ruta!

export default router;