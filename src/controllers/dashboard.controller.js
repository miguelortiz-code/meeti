export const viewDashboard = (req, res) =>{
    res.render('admin/home',{
        namePage: 'Panel Administrativo'
    })
}