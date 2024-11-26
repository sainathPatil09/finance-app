import express from "express";
import { createIncome, getUserIncomes } from "../Controller/income.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post('/income', secureRoute, createIncome);
router.get('/incomes', secureRoute, getUserIncomes);


export default router
