import express from 'express';
import {home} from './routes/index.routes.js';

const app = express();

// Habilitar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Routing
app.use('/', home);


// Habilitando archivos estaticos
app.use(express.static('src/public'));

// Arrancando servidor
app.listen(process.env.backend_port, () =>{
    console.log(`Arrancando aplicación desde el puerto:${process.env.backend_port}`);
});