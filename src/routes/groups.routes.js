import express from 'express';
import {viewNewGroup, newGroup, viewEditGroup} from '../controllers/groups.controller.js';
import {isAuthenticate, noCache, multerErrorHandler} from '../middleware/index.middleware.js';
import { uploadTo } from '../config/multer.js';

const  router = express.Router();

// Rutas GET
router.get('/new-group', isAuthenticate, noCache, viewNewGroup);
router.get('/edit-group/:code', isAuthenticate, noCache, viewEditGroup)
//Routas POST
router.post('/new-group', isAuthenticate, noCache, uploadTo('groups').single('image'), multerErrorHandler('/groups/new-group'), newGroup);



export default router