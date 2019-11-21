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

    //Empty Form
    if(!friendId){
        errors.push({msg: 'Please fill in the Friend Id'})
    }

    //Refreshes the page if an empty form is filled
    if(errors.length > 0){
        res.render('index', {name: inputUser, errors, title: 'Bubble'})
    }
})

//newRoom form is submitted
router.post('/newRoom', (req, res) => {
    //Form data
    const { inputUser, roomName, roomId } = req.body;
    let errors = []

    //Empty form
    if (!roomName || !roomId) {
        errors.push({ msg: "Please fill in all fields" })
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
        .then(() => {})
        .catch((err) => {
            //Error in creating room
            errors.push({ msg: "Something went wrong..." });
            res.render('index', { name: inputUser, errors, title: 'Bubble', roomId: 'jPBGwdGQli' });
        });

        //Sets up pushed messages
        errors.push({ msg: "Room created." });

        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            errors,
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
        errors.push({ msg: "Please fill in the room ID" })
    }

    //Refreshes the page if empty form
    if (errors.length > 0) {
        res.render('index', { name: inputUser, errors, title: 'Bubble', roomId: 'jPBGwdGQli' });
    } else {
        //Join the room
        chatkit.addUsersToRoom({
            roomId: roomId,
            userIds: [inputUser]
        })
        .then()
        .catch(err => {
            //Room does not exist
            errors.push({ msg: "Something went wrong..." });
            res.render('index', { name: inputUser, errors, title: 'Bubble', roomId: 'jPBGwdGQli' });
        });
        
        //Sets up pushed messages
        errors.push({ msg: "Room joined. You have joined room with ID: " + roomId });

        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            errors,
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
}) 

module.exports = router;