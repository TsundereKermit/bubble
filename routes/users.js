const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Chatkit = require('@pusher/chatkit-server');

//New ChatKit instance
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:c8c2181d-9998-47f7-afab-c3978ecf675c',
    key: 'd5eb01bb-3869-4621-a4a9-4ca902a83460:v3tYLijCNYuz65zdgorTxF1wybw2wVvbX924i0rByNM=',
});

//Gets the user model for registration
const User = require('../model/User');

//Triggered when localhost:5000/login is called
router.get('/login', (req, res) => res.render('login', {title: 'Login to Bubble'}));

//Triggered when localhost:5000/register is called
router.get('/register', (req, res) => res.render('register', {title: 'Register a bubble account'}));

//Handles the POST request from the register page
router.post('/register', (req, res) => {
    //Stores an object with the information from the registration form
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Registration form validation
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    //If errors are found, the page is re-rendered with the errors appended to the page
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //Registration database validation
        User.findOne({ name:name })
        .then(user => {
            if (user) {
                errors.push( {msg: 'Username is already registered'} );
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                //If no errors occur, a new user is created
                const newUser = new User({
                    name, 
                    email,
                    password
                });

                //A chatkit account is created when a Bubble account is created
                chatkit.createUser({
                    id: name,
                    name: name,
                })
                .then(() => {
                    console.log('User created successfully');
                }).catch((err) => {
                    console.log(err);
                });
                
                //A randomly regerated 10-character salt is appended to the password and hashed
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    //The hashed password is then passed to MongoDB along with the rest of the information
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        //Appends a success message to the login page when registration is complete
                        req.flash('success_msg', 'You are now registered and can log in');
                        res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                }))
            }
        })
        .catch();
    }
});

//Handles the POST request from the login page
router.post('/login', (req, res, next) => {
    //Redirects the user to the appropriate page after authentication
    passport.authenticate('local', {
        successRedirect: '/index',
        failureRedirect: '/users/login',
        failureFlash: true
    }) (req, res, next);
});

/**
 * Experimental
 * Handles the GET request from a logout button (need to implement)
 * This needs to work in conjunction with auth.js but the current ExpressJS get function seems to not allow
 * the implementation of the auth.js functions
 */
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out');
    res.redirect('/users/login');
});

module.exports = router;
