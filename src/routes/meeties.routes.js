import express from 'express';
import {viewNewMeeti, newMeetie, viewEditMeeit, editMeeti} from '../controllers/meeties.controller.js';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';
const router = express.Router();

// ROUTER GET
router.get('/new-meeti', isAuthenticate, noCache, viewNewMeeti);
router.get('/edit-meeti/:code', isAuthenticate, noCache, viewEditMeeit)

// ROUTER POST
router.post('/new-meeti', isAuthenticate, noCache, newMeetie);
router.post('/edit-meeti/:code', isAuthenticate, noCache, editMeeti);


export default router