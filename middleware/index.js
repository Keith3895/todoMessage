var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.redirectTo = req.originalUrl; 
    delete req.session.returnTo;
    res.redirect('/auth/login');
};

middlewareObj.notLoggedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    // req.flash("error", "You need to be logged out to do that");
    res.redirect('back');
};

module.exports = middlewareObj;