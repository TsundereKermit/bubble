const express = require('express');
const router = express.Router();
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
      //userId: req.user.name
    })
    .then(res => {
        //Add the room id to the rooms array if the user is the creator (admin)
        res.forEach(element => {
            if (element.created_by_id === "TsundereKermit") {
            //if (element.created_by_id === req.user.name) {
                createdRooms.push(element.id);
            }
        });
        //Adds the room array to the user's permissions data
        chatkit.updateUser({
            id: "TsundereKermit",
            //id: req.user.name,
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
        logId: 'TsundereKermit',
        roomType: 'normal'
    });
});

//makeDM form is submitted
router.post('/makeDM', (req, res) => {
    //Form data
    const { inputUser, friendId } = req.body;
    let errors = []
    var existingUser = false;
    var takenRoom = false;

    chatkit.getUsers()
        .then(user => {
            var usernames = [];
            user.forEach(element => {
                usernames.push(element.name);
            })
            for(i = 0; i < usernames.length; i++) {
                if(usernames[i] === friendId) {
                    existingUser = true;
                    console.log(i);
                    console.log(existingUser);
                }
            }
            console.log(user);
            console.log(usernames);
            if(existingUser){
                chatkit.getRooms()
                    .then(room => {
                        var rooms = [];
                        room.forEach(element => {
                            rooms.push(element.name);
                        })
                        for(j = 0; j < rooms.length; j++){
                            if(rooms[j] === friendId){
                                takenRoom = true;
                                console.log(j);
                                console.log(takenRoom);
                            }else if(rooms[j] !== friendId && !takenRoom){
                                takenRoom = false;
                                console.log(j);
                                console.log(takenRoom);
                            }
                        }
                        console.log(room);
                        console.log(rooms);
                        if(!takenRoom){
                            //Creates the room based on submitted data
                            chatkit.createRoom({
                                creatorId: inputUser,
                                name: friendId,
                                isPrivate: true,
                            })
                            .then(() => {
                                console.log('DM with ' + friendId + ' created successfully');
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        }
                    }).catch((err) => { //for get rooms
                        console.log(err);
                    });
            }
        }).catch((err) => { //for get users
            console.log(err);
        });
    
    //Empty Form
    if(!friendId){
        errors.push({msg: 'Please fill in the Friend Id'})
    }

    //Refreshes the page if an empty form is filled
    if (errors.length > 0) {
        res.render('index', { 
            name: inputUser, 
            errors, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli', 
            logId: inputUse,
            roomType: 'DM'
        })
    }
       
        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli',
            logId: inputUser,
            roomType: 'DM'
        });
    });

    //addFriend form is submitted
router.post('/addFriend', (req, res) => {
    //Form data
    const { inputUser, friendId } = req.body;
    let errors = []
    var dmId;

    //Empty form
    if (!friendId) {
        errors.push({ msg: "Please fill in the friend ID" })
    }

    //Refreshes the page if empty form
    if (errors.length > 0) {
        res.render('index', { 
            name: inputUser, 
            errors, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli', 
            logId: inputUser,
            roomType: 'DM'
        });
    } else {
        chatkit.getRooms({
            includePrivate: true
        })
        .then(room => {
            room.forEach(element => {
                if(element.name === friendId){
                    // dmId = element.id;
                    //Join the room
                    chatkit.addUsersToRoom({
                        roomId: element.id,
                        userIds: [friendId]
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
                            logId: inputUser,
                            roomType: 'DM'
                        });
                    });
                }
            })
        }).catch((err) => { //for get rooms
            console.log(err);
        });

        
        
        //Sets up pushed messages
        errors.push({ msg: friendId + " has been added to the DM" });

        //Renders the index page
        res.render('index', { 
            name: inputUser, 
            errors,
            title: 'Bubble', 
            roomId: 'jPBGwdGQli', 
            logId: inputUser,
            roomType: 'DM'
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
        errors.push({ msg: "Please fill in all fields" });
    }

    //Default room
    if (roomId === "jPBGwdGQli") {
        errors.push({msg: "This room ID is forbidden"});
    }

    //Refreshes the page if an empty form is filled
    if (errors.length > 0) {
        res.render('index', { 
            name: inputUser, 
            errors, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli', 
            logId: inputUser,
            roomType: 'normal'
        })
    } else {
        //Creates the room based on submitted data
        chatkit.createRoom({
            id: roomId,
            creatorId: inputUser,
            name: roomName,
        })
        .then()
        .catch((err) => {
            //Error in creating room
            errors.push({ msg: "Something went wrong..." });
            res.render('index', { 
                name: inputUser, 
                errors, 
                title: 'Bubble', 
                roomId: 'jPBGwdGQli', 
                logId: inputUser,
                roomType: 'normal'
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
            logId: inputUser,
            roomType: 'normal'
        });
    }
});

//joinRoom form is submitted
router.post('/joinRoom', (req, res) => {
    //Form data
    const { inputUser, roomId } = req.body;
    let errors = [];

    //Empty form
    if (!roomId) {
        errors.push({ msg: "Please fill in the room ID" });
    }

    //Refreshes the page if empty form
    if (errors.length > 0) {
        res.render('index', { 
            name: inputUser, 
            errors, 
            title: 'Bubble', 
            roomId: 'jPBGwdGQli', 
            logId: inputUser,
            roomType: 'normal'
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
                logId: inputUser,
                roomType: 'normal'
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
            logId: inputUser,
            roomType: 'normal'
        });
    }
});

//changeRoomForm is submitted
router.post('/changeRoom', (req, res) => {
    //Form data
    const { userId, changeRoomName } = req.body; 
    //Render the new room
    res.render('index', { 
        name: userId, 
        title: 'Bubble',
        roomId: changeRoomName,
        logId: userId,
        roomType: 'normal'
    });
});

//changeRoomForm is submitted
router.post('/changeDM', (req, res) => {
    //Form data
    const { userId, changeRoomName } = req.body; 
    //Render the new room
    res.render('index', { 
        name: userId, 
        title: 'Bubble',
        roomId: changeRoomName,
        logId: userId,
        roomType: 'DM'
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
        logId: logChangeName,
        roomType: 'normal'
    });
});

//deleteMsg form is submitted
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
        logId: userId,
        roomType: 'normal'
    });
});

//kickUserForm submitted
router.post("/kickUser", (req, res) => {
    //Form data 
    const {userId, roomId, kickUser} = req.body;

    if (userId !== kickUser) {
        chatkit.removeUsersFromRoom({
            roomId: roomId,
            userIds: [kickUser]
        })
        .then()
        .catch(err => console.error(err));
    }
    
    //Render the new room
    res.render('index', { 
        name: userId, 
        title: 'Bubble',
        roomId: roomId,
        logId: userId,
        roomType: 'normal'
    });
});

module.exports = router;