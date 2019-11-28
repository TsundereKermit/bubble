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
router.get("/index", (req, res) => {
    var createdRooms = [];
    //Get all rooms that the user is in
    chatkit.getUserRooms({
      userId: "TsundereKermit"
    })
    .then(res => {
        //Add the room id to the rooms array if the user is the creator (admin)
        res.forEach(element => {
            if (element.created_by_id === "TsundereKermit") {
                createdRooms.push(element.id);
            }
        });
        //Adds the room array to the user's permissions data
        chatkit.updateUser({
            id: "TsundereKermit",
            customData: {
                perm: createdRooms
            }
        });
    })
    .catch(err => console.error(err));

    //Render the index page
    res.render("index", {
        //name: req.user.name,
        name: "TsundereKermit",
        title: "Bubble",
        roomId: "jPBGwdGQli", 
        //logId: req.user.name
        logId: 'TsundereKermit'
    });
});

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
            console.error(err);
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
        errors.push({ msg: "Please fill in all fields" })
    }

    //Refreshes the page if an empty form is filled
    if (errors.length > 0) {
        res.render('index', { 
            name: inputUser, 
            errors, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli', 
            logId: inputUser
        })
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
            res.render('index', { 
                name: inputUser, 
                errors, 
                title: 'Bubble', 
                roomId: 'jPBGwdGQli', 
                logId: inputUser
            });
        });

        //Sets up pushed messages
        errors.push({ msg: "Room created." });

        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            errors,
            title: 'Bubble', 
            roomId: 'jPBGwdGQli',
            logId: inputUser
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
        res.render('index', { 
            name: inputUser, 
            errors, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli', 
            logId: inputUser 
        });
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
            res.render('index', { 
                name: inputUser, 
                errors, 
                title: 'Bubble', 
                roomId: 'jPBGwdGQli', 
                logId: inputUser
            });
        });
        
        //Sets up pushed messages
        errors.push({ msg: "Room joined. You have joined room with ID: " + roomId });

        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            errors,
            title: 'Bubble', 
            roomId: 'jPBGwdGQli', 
            logId: inputUser
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
        roomId: changeRoomName,
        logId: userId
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

router.post("/chatlog", (req, res) => {
    //Form data
    const { userId, roomId, logChangeName } = req.body;
    
    //Render index with new log
    res.render("index", {
        name: userId,
        title: "Bubble",
        roomId: roomId,
        logId: logChangeName
    });
});

router.post("/deleteMsg", (req, res) => {
    //Form data
    const { roomId, userId, message } = req.body;

    chatkit.fetchMultipartMessages({
        roomId: roomId,
        limit: 100,
    })
    .then(messages => {
        for (let m of messages) {
            if (m.parts[0].content === message) {
                chatkit.deleteMessage({
                    roomId: roomId,
                    messageId: m.id
                })
                .then()
                .catch(err => console.error(err));
                break;
            }
        }
    })
    .catch(err => console.error(err));

    //Render the new room
    res.render('index', { 
        name: userId, 
        title: 'Bubble',
        roomId: roomId,
        logId: userId
    });
})

module.exports = router;