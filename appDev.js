const React = require('react');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Express
const app = express();

 /* render() {
    return (
      <div className="app">
        <MessageList messages={this.state.messages} />
      </div>
    )
  }*/

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

//Creates port 5000 (localhost:5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
