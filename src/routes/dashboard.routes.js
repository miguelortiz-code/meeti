import express from 'express';
import {viewDashboard} from '../controllers/dashboard.controller.js';
import {noCache, isAuthenticated} from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/dashboard', isAuthenticated, noCache, viewDashboard);






export default router