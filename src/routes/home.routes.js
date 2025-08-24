import express from 'express';
import {viewHome, viewRegister} from '../controllers/index.controller.js'
const router = express.Router();


router.get('/', viewHome);

router.get('/register', viewRegister);

export default router;