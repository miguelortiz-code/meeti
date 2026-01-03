import express from 'express';
import {viewProfile} from '../controllers/profile.controller.js';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';

const router = express.Router();


// Router GET
router.get('/:code', isAuthenticate, noCache, viewProfile);

//Router POST


export default router