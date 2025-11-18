import express from 'express';
import {viewNewGroup, newGroup, viewEditGroup, editGroup, viewImageGroup, saveImageGroup} from '../controllers/groups.controller.js';
import {isAuthenticate, noCache, multerErrorHandler, updateImage} from '../middleware/index.middleware.js';
import { uploadTo } from '../config/multer.js';

const  router = express.Router();

// Rutas GET
router.get('/new-group', isAuthenticate, noCache, viewNewGroup);
router.get('/edit-group/:code', isAuthenticate, noCache, viewEditGroup);
router.get('/image-group/:code', isAuthenticate, noCache, viewImageGroup);
//Routas POST
router.post('/new-group', isAuthenticate, noCache, uploadTo('groups').single('image'), multerErrorHandler(), newGroup);
router.post('/edit-group/:code', isAuthenticate, noCache, editGroup);
router.post('/image-group/:code', isAuthenticate, noCache, uploadTo("groups").single("image"), multerErrorHandler(), saveImageGroup, updateImage('groups'));



export default router