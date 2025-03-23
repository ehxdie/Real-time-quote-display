import { Router } from 'express';
import { getQuoteBySymbol } from '../controller/quoteController';

const router = Router();

// Quote endpoint
router.get('/quote/:symbol', getQuoteBySymbol);

export default router;