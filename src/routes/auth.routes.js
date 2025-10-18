import express from 'express';
import {viewRegister, viewLogin} from '../controllers/auth.controller.js';

const router = express.Router();

//ROUTER GET
router.get('/register', viewRegister);
router.get('/login', viewLogin);



export default router
