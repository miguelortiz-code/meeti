import express from 'express';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';
import {newCategory, viewCategories} from '../controllers/cateogires.controller.js';

const router = express.Router();


// Router GET
router.get('/categories', isAuthenticate, noCache, viewCategories);

//Router POST
router.post('/new-category', isAuthenticate, noCache, newCategory);


export default router