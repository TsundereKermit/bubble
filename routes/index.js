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

//localhost:5000 is called
router.get('/', (req, res) => res.render('welcome', {title: 'Welcome to Bubble'}));

//localhost:5000/index is called
router.get('/index', (req, res) => 
    res.render('index', {
        //name: req.user.name,
        name: "TsundereKermit",
        title: 'Bubble', 
        roomId: 'jPBGwdGQli'
    }));

//addFriend form is submitted
router.post('/addFriend', (req, res) => {
    //Form data
    const { inputUser, friendId } = req.body;
    let errors = []

    //Empty form
    if (!friendId) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    //Refreshes the page if an empty form is filled
    if (errors.length > 0) {
        res.render('index', { name: inputUser, errors, title: 'Bubble' })
    } else {
        //Creates the room based on submitted data
        chatkit.createRoom({
            creatorId: inputUser,
            name: friendId,
            private: true,
        })
        .then(() => {
            console.log('DM with ' + friendId + ' created successfully');
        })
        .catch((err) => {
            console.log(err);
        });

        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli' 
        });
    }
});

//newRoom form is submitted
router.post('/newRoom', (req, res) => {
    //Form data
    const { inputUser, roomName, roomId } = req.body;
    let errors = []

    //Empty form
    if (!roomName || !roomId) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    //Refreshes the page if an empty form is filled
    if (errors.length > 0) {
        res.render('index', { name: inputUser, errors, title: 'Bubble', roomId: 'jPBGwdGQli' })
    } else {
        //Creates the room based on submitted data
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

        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli' 
        });
    }
});

//joinRoom form is submitted
router.post('/joinRoom', (req, res) => {
    //Form data
    const { inputUser, roomId } = req.body;
    let errors = []

    //Empty form
    if (!roomId) {
        errors.push({ msg: 'Please fill in the room ID' })
    }

    //Refreshes the page if empty form
    if (errors.length > 0) {
        res.render('index', { name: inputUser, errors, title: 'Bubble', roomId: 'jPBGwdGQli' })
    } else {
        //Join the room
        chatkit
          .addUsersToRoom({
            roomId: roomId,
            userIds: [inputUser]
          })
          .then(() => console.log("added " + inputUser + " to room ID: " + roomId))
          .catch(err => console.error(err));

        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli' 
        });
    }
});

router.post('/changeRoom', (req, res) => {
    //Form data
    const { userId, changeRoomName } = req.body; 
    //Render the new room
    res.render('index', { 
        name: userId, 
        title: 'Bubble',
        roomId: changeRoomName
    });
});

router.post('/changeDM', (req, res) => {
    //Form data
    const { userId, changeDMName } = req.body;
    //Reder the new DM room
    res.render('index', {
        name: userId,
        title: 'Bubble',
        roomId: changeDMName
    });
});

module.exports = router;