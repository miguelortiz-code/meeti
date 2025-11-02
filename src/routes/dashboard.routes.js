import express from 'express';
import {viewDashboard} from '../controllers/dashboard.controller.js';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';

const router = express.Router();

router.get('/dashboard', isAuthenticate, noCache, viewDashboard);

export default router