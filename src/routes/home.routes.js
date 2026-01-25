import express from 'express';
import {home, viewMeetiForSlug, confirmAttendance, viewAssistants, viewUsers, viewGroup} from '../controllers/home.controller.js';
import {isAuthenticate} from '../middleware/index.middleware.js';

const router = express.Router();

// Routes GET
router.get('/', home);
router.get('/meeti/:slug', viewMeetiForSlug)
router.get('/assistants/:slug', isAuthenticate, viewAssistants);
router.get('/user/:code', isAuthenticate, viewUsers);
router.get('/group/:code', isAuthenticate, viewGroup);
// Router POST
router.post('/confirm-attendance/:code', isAuthenticate, confirmAttendance);

export default router