import express from 'express';
import {home, viewMeetiForSlug, confirmAttendance, viewAssistants, viewUsers, viewGroup, viewMeetiForCategory, comments, deleteComment, viewSearch} from '../controllers/home.controller.js';
import {isAuthenticate} from '../middleware/index.middleware.js';

const router = express.Router();

// Routes GET
router.get('/', home);
router.get('/meeti/:slug', viewMeetiForSlug)
router.get('/assistants/:slug', isAuthenticate, viewAssistants);
router.get('/user/:code', isAuthenticate, viewUsers);
router.get('/group/:code', isAuthenticate, viewGroup);
router.get('/categoria/:slug', viewMeetiForCategory);
router.get('/search', viewSearch)
// Router POST
router.post('/confirm-attendance/:code', isAuthenticate, confirmAttendance);
router.post('/meeti/:id', isAuthenticate, comments);
router.post('/delete-comment', deleteComment);
export default router