const React = require('react');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

/**
 * School/library version of app.js
 * The MongoDB implementation is removed in this version because the port that MongoDB uses was blocked by the school
 */

//Express
const app = express();

//EJS usage with ExpressJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:false }));

//Express-session
app.use(session({
  secret: 'sliding',
  resave: true,
  saveUninitialized: true
}));

//Connect-flash, supporting error/success messages
app.use(flash());

//Flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//Shortens the routes when post/get requests are called
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users'));
app.use('/index', require('./routes/index'));

//Serves static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

//Creates port 5000 (localhost:5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
