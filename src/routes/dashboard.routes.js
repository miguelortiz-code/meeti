import express from 'express';
import {viewDashboard} from '../controllers/dashboard.controller.js';
import {noCache, isAuthenticated} from '../middleware/index.middleware.js';

const router = express.Router();
// Routes GET
router.get('/dashboard', isAuthenticated, noCache, viewDashboard);




export default router