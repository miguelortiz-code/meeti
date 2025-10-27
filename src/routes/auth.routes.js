import express from 'express';
import {viewRegister, viewLogin, register, confirmAccount} from '../controllers/auth.controller.js';

const router = express.Router();

//ROUTER GET
router.get('/register', viewRegister);
router.get('/login', viewLogin);
router.get('/confirm-account/:token', confirmAccount);

// ROUTER POST
router.post('/register', register);



export default router
