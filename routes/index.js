const express = require('express');
const router = express.Router();
/**
 * const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
 * Not completely sure how to implement this yet
 */
const Chatkit = require('@pusher/chatkit-server');

//New ChatKit instance
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:c8c2181d-9998-47f7-afab-c3978ecf675c',
    key: 'd5eb01bb-3869-4621-a4a9-4ca902a83460:v3tYLijCNYuz65zdgorTxF1wybw2wVvbX924i0rByNM=',
});

//When localhost:5000 is called
router.get('/', (req, res) => res.render('welcome', {title: 'Welcome to Bubble'}));

//When localhost:5000/index is called
router.get('/index', (req, res) => 
    res.render('index', {
        name: req.user.name,
        title: 'Bubble'
    }));

router.post('/newRoom', (req, res) => {
    const { inputUser, roomName, roomId } = req.body;
    let errors = []

    if (!roomName || !roomId) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    if (errors.length > 0) {
        res.render('index', { name: inputUser, errors, title: 'Bubble' })
    } else {
        chatkit.createRoom({
            id: roomId,
            creatorId: inputUser,
            name: roomName,
        })
        .then(() => {
            console.log('Room created successfully');
        })
        .catch((err) => {
            console.log(err);
        });

        res.render('index', { name: inputUser, title: 'Bubble' })
    }
});

router.post('/joinRoom', (req, res) => {
    const { inputUser, roomId } = req.body;
    let errors = []

    if (!roomId) {
        errors.push({ msg: 'Please fill in the room ID' })
    }

    if (errors.length > 0) {
        res.render('index', { name: inputUser, errors, title: 'Bubble' })
    } else {
        chatkit
          .addUsersToRoom({
            roomId: roomId,
            userIds: [inputUser]
          })
          .then(() => console.log("added " + inputUser + " to room ID: " + roomId))
          .catch(err => console.error(err));

        res.render('index', { name: inputUser, title: 'Bubble' })
    }
});

module.exports = router;