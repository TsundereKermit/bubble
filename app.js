import React, {Component} from 'react'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);

const db = require('./config/keys').MongoURI;

class app extends Component {
  render() {
    return (
      <div className="app">
        <MessageList messages={this.state.messages} />
      </div>
    )
  }
}

mongoose
  .connect(
    db,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err)); 

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended:false }));

app.use(session({
  secret: 'nom is cursed',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
