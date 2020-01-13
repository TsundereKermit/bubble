const mongoose = require('mongoose');

//Initializes a model for user creation when the registration is done
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        defualt: Date.now
    }
});

//Gets all user schemas from MongoDB
const User = mongoose.model('User', userSchema);

module.exports = User;