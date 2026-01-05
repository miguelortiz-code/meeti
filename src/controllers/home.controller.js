import {Categories} from '../models/index.model.js';

export const home = async (req, res)=>{
    // Consulta multiple con Promise
    const queries = [];
    queries.push(Categories.findAll({}));

    // Extraer datos y pasar a la vista
    const [categories] = await Promise.all(queries);

    res.render('home/index',{
        namePage: 'Inicio',
        categories
    })
}