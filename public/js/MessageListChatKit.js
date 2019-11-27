//Gets the ChatKit userId (identical to the Bubble username)
var username = document.getElementById("name").textContent;

//Gets the ChatKit roomId
var roomId = document.getElementById("roomId").textContent;

//Gets the ChatKit roomId
var logId = document.getElementById("logId").textContent;

/**
 * Experimental
 * We are using our own token provider instead of ChatKit's native token provider right now, the native one
 * supports production usage while our own supports experimental usage
 */
const tokenProvider = new Chatkit.TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/c8c2181d-9998-47f7-afab-c3978ecf675c/token"
});

//Initializes our ChatKit's chatmanager
const chatManager = new Chatkit.ChatManager({
  instanceLocator: "v1:us1:c8c2181d-9998-47f7-afab-c3978ecf675c",
  userId: username,
  tokenProvider: tokenProvider
});

var userIsAdmin = false;
chatManager
  .connect()
  .then(currentUser => {
    //Default room
    if (roomId === "jPBGwdGQli") {
      roomId = currentUser.rooms[0].id;
      document.getElementById("deleteMsgRoom").value = roomId;
    }
    currentUser.customData.perm.forEach(element => {
      if (element === roomId) {
        userIsAdmin = true;
      }
    });
    //Access room messages and users
    currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          //Chat log mode
          const ul = document.getElementById("logList");
          //Adds the message to the log if it belongs to the user
          if (message.sender.id === logId) {
            var li = document.createElement("li");
            li.appendChild(
              document.createTextNode(message.parts[0].payload.content)
            );
            ul.appendChild(li);
          }
          const h5 = document.getElementById("titId");
          h5.innerHTML = logId;
          //Bubble mode
          //Gets the most recent 100 messages ordered from newest to oldest
          currentUser
            .fetchMultipartMessages({
              roomId: roomId,
              direction: 'older',
              limit: 100
            })
            .then(messages => {
              var currentRooms = currentUser.rooms;
              var thisRoom;
              //Get the room that the MessageList should display based on roomId
              currentRooms.forEach(element => {
                if (element.id === roomId) {
                  thisRoom = element;
                }
              });
              //Gets an array of all users in the room
              var userArray = thisRoom.users;
              //Setup boolean for if/else
              var messageAppended = false;
              //Loops through all the users to get content for each card
              for (let i = 0; i < userArray.length; i++) {
                const cardUser = userArray[i];
                //Loops for the messages
                for (let j = 0; j < messages.length; j++) {
                  if (messages[j].sender.id === cardUser.id) { //Other passed terms
                    //Gets the text portion of the most recent message
                    lastMessage = messages[j].parts[0].payload.content;
                    //Get the card component ids
                    var cardId = i.toString();
                    var cardUserId = "hd" + cardId;
                    var imgId = "img" + cardId;
                    var presId = "pres" + cardId;
                    //Add the setting button
                    document.getElementById(imgId).setAttribute("class", "fas fa-ellipsis-v");
                    document.getElementById(presId).setAttribute("class", "fas fa-circle");
                    if (userArray[i].presence.state === "online") {
                      document.getElementById(presId).setAttribute("style", "color:green");
                    } else {
                      document.getElementById(presId).setAttribute("style", "color:gray");
                    }
                    //Changes the card components
                    document.getElementById(cardId).innerHTML = lastMessage;
                    document.getElementById(cardUserId).innerHTML = cardUser.id;
                    document.getElementById(cardUserId).classList.add(cardUser.id);
                    messageAppended = true;
                  } else if (j === messages.length - 1) { //Last failed term or no messages has been sent
                    //If a message is appended before, the defualt noMessage string will not be appended
                    if (messageAppended === true) {
                      break;
                    } else {
                      lastMessage = `${cardUser.name} has not sent a message in this room recently`;
                    }
                    //Get the card component ids
                    var cardId = i.toString();
                    var cardUserId = "hd" + cardId;
                    var imgId = "img" + cardId;
                    var presId = "pres" + cardId;
                    //Add the setting button
                    document.getElementById(imgId).setAttribute("class", "fas fa-ellipsis-v");
                    document.getElementById(presId).setAttribute("class", "fas fa-circle");
                    if (userArray[i].presence.state === "online") {
                      document.getElementById(presId).setAttribute("style", "color:green");
                    } else {
                      document.getElementById(presId).setAttribute("style", "color:gray");
                    }
                    //Changes the card components
                    document.getElementById(cardId).innerHTML = lastMessage;
                    document.getElementById(cardUserId).innerHTML = cardUser.id;
                  }
                }
              }
            })
            .catch(err => {
              console.error(`Error fetching messages: ${err}`);
            });
        },
        onUserStartedTyping: user => {
          console.log("User is typing...");
          document.getElementById(user.id).innerHTML = user.id + " (typing...)";
        },
        onUserStoppedTyping: user => {
          console.log("User stopped typing");
          document.getElementById(user.id).innerHTML = user.id;
        }
      }
    });
  })
  .catch(error => {
    console.error("error:", error);
  });
