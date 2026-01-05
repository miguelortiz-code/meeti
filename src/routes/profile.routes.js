import express from 'express';
import {viewProfile, profile, viewChangePassword, changePassword, viewImageProfile, saveImageProfile} from '../controllers/profile.controller.js';
import {isAuthenticate, noCache, multerErrorHandler, updateImage} from '../middleware/index.middleware.js';
import {uploadTo} from '../config/multer.js';

const router = express.Router();


// Router GET
router.get('/:code', isAuthenticate, noCache, viewProfile);
router.get('/change-password/:code' , isAuthenticate, noCache, viewChangePassword)
router.get('/image-profile/:code', isAuthenticate, noCache, viewImageProfile);


//Router POST
router.post ('/:code/profile', isAuthenticate, noCache, profile);
router.post('/change-password/:code', isAuthenticate, noCache, changePassword)
router.post('/image-profile/:code', isAuthenticate, noCache, uploadTo('profiles').single('image'), multerErrorHandler(), saveImageProfile, updateImage('profiles'))
export default router