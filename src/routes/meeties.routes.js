import express from 'express';
import {viewNewMeeti, newMeetie, viewEditMeeit, editMeeti, viewDeleteMeeti, deleteMeeti} from '../controllers/meeties.controller.js';
import {isAuthenticate, noCache, validateUUID} from '../middleware/index.middleware.js';
const router = express.Router();

// ROUTER GET
router.get('/new-meeti', isAuthenticate, noCache, viewNewMeeti);
router.get('/edit-meeti/:code', isAuthenticate, noCache, validateUUID, viewEditMeeit)
router.get('/delete-meeti/:code', isAuthenticate, noCache, validateUUID, viewDeleteMeeti)

// ROUTER POST
router.post('/new-meeti', isAuthenticate, noCache, newMeetie);
router.post('/edit-meeti/:code', isAuthenticate, noCache,validateUUID, editMeeti);
router.post('/delete-meeti/:code', isAuthenticate, noCache, validateUUID, deleteMeeti);


export default router