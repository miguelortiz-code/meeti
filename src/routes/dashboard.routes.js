import express from 'express';
import {viewDashboard, formNewGruop} from '../controllers/dashboard.controller.js';
import {noCache, isAuthenticated} from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/dashboard', isAuthenticated, noCache, viewDashboard);
router.get('/new-group', isAuthenticated, noCache, formNewGruop);





export default router