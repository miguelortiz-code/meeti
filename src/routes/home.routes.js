import express from 'express';
import {home, viewMeetiForSlug, confirmAttendance} from '../controllers/home.controller.js';
import {isAuthenticate} from '../middleware/index.middleware.js';

const router = express.Router();

// Routes GET
router.get('/', home);
router.get('/meeti/:slug', viewMeetiForSlug)

// Router POST
router.post('/confirm-attendance/:code', isAuthenticate, confirmAttendance);

export default router