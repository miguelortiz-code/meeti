import express from 'express';
import {formNewGruop, newGroup, formEditGroup, editGroup, formmageGroup} from '../controllers/groups.controller.js'
import {noCache, isAuthenticated, multerMiddleware, multerErrorHandler} from '../middleware/index.middleware.js';

const router = express.Router();

// Router GET
router.get('/new-group', isAuthenticated, noCache, formNewGruop);
router.get('/edit-group/:code', isAuthenticated, noCache, formEditGroup);
router.get('/image-group/:code', isAuthenticated, noCache, formmageGroup);
//Routes POST
router.post('/new-group', isAuthenticated, noCache, multerMiddleware('groups').single('image'), multerErrorHandler, newGroup);
router.post('/edit-group/:code', isAuthenticated, noCache, editGroup);
router.post('/image-group/:code' , isAuthenticated, noCache);


export default router