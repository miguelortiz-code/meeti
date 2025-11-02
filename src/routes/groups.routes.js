import express from 'express';
import {viewNewGroup} from '../controllers/groups.controller.js';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';

const  router = express.Router();

// Rutas GET
router.get('/new-group', isAuthenticate, noCache, viewNewGroup);




export default router