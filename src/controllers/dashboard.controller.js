const viewDashboard = (req, res) =>{
    res.render('admin/dashboard',{
        namePage : 'Panel administrativo'
    })
}


export{
    viewDashboard
}