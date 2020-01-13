const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../model/User');

module.exports = function (passport) {
    //Login authentication
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Attempts to find a user with the same email
            User.findOne({ email:email })
            .then(user => {
                //If a match is not found, the error message will be appended to the UI of login page
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                } 

                //Checks the password for authenticity
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    //If a match is not found, the error message will be appended to the UI of login page
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            })
            .catch(err => console.error(err));
        })
    );
    
    //Stores session info into a cookie
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    //Finds the cookie with the user's information
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });
}