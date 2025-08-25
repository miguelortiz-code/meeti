import express from 'express';
import {viewHome, viewRegister, register, viewLogin} from '../controllers/home.controller.js'
const router = express.Router();

// ROUTES GET
router.get('/', viewHome);
router.get('/register', viewRegister);
router.get('/login', viewLogin);

// ROUTES POST
router.post('/register', register);


export default router;