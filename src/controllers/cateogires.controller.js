import {Categories} from '../models/index.model.js';

export const viewCategories =  async (req, res) =>{
    const categories = await Categories.findAll();
    
    // Mostrar vista de las categorias

    res.render('categories', {
        namePage: "Categorias para los Metti's",
        categories,
        enableBundle: false
    });
}