import express from 'express';
import {formNewGruop, newGroup, formEditGroup} from '../controllers/groups.controller.js'
import {noCache, isAuthenticated, multerMiddleware, multerErrorHandler} from '../middleware/index.middleware.js';

const router = express.Router();

// Router GET
router.get('/new-group', isAuthenticated, noCache, formNewGruop);
router.get('/edit-group/:code', isAuthenticated, noCache, formEditGroup);
//Routes POST
router.post('/new-group', isAuthenticated, noCache, multerMiddleware('groups').single('image'), multerErrorHandler, newGroup);


export default router