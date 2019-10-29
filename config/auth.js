//Will be used later to ensure that logged in users will not be required to log in again during the current session
module.export = {
    ensureAuthenticated: function(req, res, next) {
        //If user is already logged in, the program will not be prompted to login
        if(req.isAuthenticated()) {
            return next();
        }
        
        //Otherwise the user will be prompted to login
        req.flash('err_msg', 'Please log in to Bubble');
        res.redirect('/users/login');
    }
}