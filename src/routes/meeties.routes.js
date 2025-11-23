import express from 'express';
import {viewNewMeeti} from '../controllers/meeties.controller.js';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';
const router = express.Router();

// ROUTER GET
router.get('/new-meeti', isAuthenticate, noCache, viewNewMeeti);




export default router