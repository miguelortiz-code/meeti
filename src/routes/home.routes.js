import express from 'express';
import {viewHome, viewRegister, register, viewLogin, ConfirmAccount} from '../controllers/home.controller.js'
const router = express.Router();

// ROUTES GET
router.get('/', viewHome);
router.get('/register', viewRegister);
router.get('/login', viewLogin);
router.get('/confirm-account/:token', ConfirmAccount);
// ROUTES POST
router.post('/register', register);


export default router;