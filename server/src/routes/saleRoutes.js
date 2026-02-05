import { Router } from 'express';
import { checkoutSale, getSales } from '../controllers/saleController.js';

const router = Router();

router.get('/', getSales);
router.post('/checkout', checkoutSale);

export default router;
