import express from 'express';
import {home} from '../controllers/home.controller.js';

const router = express.Router();

// Routes GET
router.get('/', home);



export default router