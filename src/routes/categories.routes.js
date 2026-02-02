import express from 'express';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';
import {viewCategories} from '../controllers/cateogires.controller.js';

const router = express.Router();


// Router GET
router.get('/categories', isAuthenticate, noCache, viewCategories);



export default router