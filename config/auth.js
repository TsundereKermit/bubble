module.export = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('err_msg', 'Please log in to Bubble');
        res.redirect('/users/login');
    }
}