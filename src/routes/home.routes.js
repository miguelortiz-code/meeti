import express from 'express';
import {viewHome, viewRegister, register} from '../controllers/index.controller.js'
const router = express.Router();

// ROUTES GET
router.get('/', viewHome);
router.get('/register', viewRegister);

// ROUTES POST
router.post('/register', register);


export default router;