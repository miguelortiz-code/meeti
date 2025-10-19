import express from 'express';
import {viewRegister, viewLogin, register} from '../controllers/auth.controller.js';

const router = express.Router();

//ROUTER GET
router.get('/register', viewRegister);
router.get('/login', viewLogin);

// ROUTER POST
router.post('/register', register);



export default router
