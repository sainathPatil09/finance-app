import { createExpense, getUserExpenses } from "../Controller/expense.controller.js";
import express from 'express'
import secureRoute from "../middleware/secureRoute.js";


const router = express.Router();

router.post('/expense',secureRoute, createExpense);
router.get('/expenses',secureRoute, getUserExpenses);


export default router