import express from 'express';
import {viewNewGroup, newGroup} from '../controllers/groups.controller.js';
import {isAuthenticate, noCache} from '../middleware/index.middleware.js';

const  router = express.Router();

// Rutas GET
router.get('/new-group', isAuthenticate, noCache, viewNewGroup);
//Routas POST
router.post('/new-group', isAuthenticate, noCache, newGroup);



export default router