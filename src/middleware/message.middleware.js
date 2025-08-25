const message = (req, res, next) =>{
    res.locals.message = req.flash();
    next();
}

export default message;