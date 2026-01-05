import express from 'express';
import {viewRegister, viewLogin, register, confirmAccount, login, logout} from '../controllers/auth.controller.js';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js'

const router = express.Router();

//ROUTER GET
router.get('/register', viewRegister);
router.get('/login', viewLogin);
router.get('/confirm-account/:token', confirmAccount);
router.get('/logout', isAuthenticate, noCache, logout);

// ROUTER POST
router.post('/register', register);
router.post('/login', login)



export default router
