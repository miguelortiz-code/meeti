import express from 'express';
import {viewDashboard} from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/dashboard', viewDashboard);

export default router