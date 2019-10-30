const express = require('express');
const router = express.Router();
/**
 * const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
 * Not completely sure how to implement this yet
 */

//When localhost:5000 is called
router.get('/', (req, res) => res.render('welcome', {title: 'Welcome to Bubble'}));

//When localhost:5000/index is called
router.get('/index', (req, res) => 
    res.render('index', {
        name: req.user.name,
        title: 'Bubble'
    }));

module.exports = router;