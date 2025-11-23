export const  viewNewMeeti = async (req, res) =>{
   res.render('meeties/new-meeti',{
    namePage: 'Crear tu Meeti',
    data: {}
   }) 
}
