import express from 'express';
const router = express.Router();


router.get('/', (req, res) =>{
    res.send('Inicio');
});

router.get('/register', (req, res) =>{
    res.send('Crea tu cuenta en meeti')
});

export default router;