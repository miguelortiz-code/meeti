import express from 'express';
import {viewProfile, profile} from '../controllers/profile.controller.js';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';

const router = express.Router();


// Router GET
router.get('/:code', isAuthenticate, noCache, viewProfile);

//Router POST
router.post ('/:code/profile', isAuthenticate, noCache, profile);

export default router