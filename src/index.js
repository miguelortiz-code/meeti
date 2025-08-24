import express from 'express';


const app = express();




// Arrancando servidor
app.listen(process.env.backend_port, () =>{
    console.log(`Arrancando aplicación desde el puerto:${process.env.backend_port}`);
});