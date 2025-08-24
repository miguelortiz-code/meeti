import express from 'express';
import {home} from './routes/index.routes.js';

const app = express();


// Routing
app.use('/', home);


// Arrancando servidor
app.listen(process.env.backend_port, () =>{
    console.log(`Arrancando aplicación desde el puerto:${process.env.backend_port}`);
});