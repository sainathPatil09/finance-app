import express from "express";
import {signup, login, logout, getUser, deleteTransaction} from '../Controller/user.controller.js'
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/myself', secureRoute, getUser)
router.delete('/delete/:id', secureRoute, deleteTransaction);

export default router