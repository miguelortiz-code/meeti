import express from 'express';
import {viewDashboard, formNewGruop, newGroup} from '../controllers/dashboard.controller.js';
import {noCache, isAuthenticated, multerMiddleware, multerErrorHandler} from '../middleware/index.middleware.js';

const router = express.Router();
// Routes GET
router.get('/dashboard', isAuthenticated, noCache, viewDashboard);
router.get('/new-group', isAuthenticated, noCache, formNewGruop);
//Routes POST
router.post('/new-group', isAuthenticated, noCache, multerMiddleware('groups').single('image'), multerErrorHandler, newGroup);





export default router