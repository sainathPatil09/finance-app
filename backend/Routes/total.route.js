import express from 'express'

import { totalExpenseBalance } from '../Controller/total.controller.js';
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();

router.get('/totals', secureRoute, totalExpenseBalance)

export default router
