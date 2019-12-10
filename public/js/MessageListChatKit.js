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
    //Check for user privileges
    currentUser.customData.perm.forEach(element => {
      if (element === roomId) {
        userIsAdmin = true;
      }
    });
    //Get messages in roomId
    currentUser.fetchMultipartMessages({
        roomId: roomId,
        direction: "older",
        limit: 100
      })
      .then(messages => {
        //Chat log mode
        const ul = document.getElementById("logList");
        //Adds the message to the log if it belongs to the user
        messages.forEach(element => {
          if (element.senderId === logId) {
            var li = document.createElement("li");
            var div = document.createElement("div");
            div.innerHTML = element.parts[0].payload.content;
            div.setAttribute("class", "logContent");
            li.appendChild(div);
            ul.appendChild(li);
          }
        });
        const h5 = document.getElementById("titId");
        h5.innerHTML = logId;

        //Bubble mode
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
            if (messages[j].sender.id === cardUser.id) {
              //Other passed terms
              //Gets the text portion of the most recent message
              lastMessage = messages[j].parts[0].payload.content;
              //Get the card component ids
              var cardId = i.toString();
              var cardUserId = "hd" + cardId;
              var imgId = "img" + cardId;
              var presId = "pres" + cardId;
              //Add the setting button
              document
                .getElementById(imgId)
                .setAttribute("class", "fas fa-ellipsis-v");
              /*
              document
                .getElementById(presId)
                .setAttribute("class", "fas fa-circle");
              //Check for user presence
              if (userArray[i].presence.state === "online") {
                document
                  .getElementById(presId)
                  .setAttribute("style", "color:green");
              } else {
                document
                  .getElementById(presId)
                  .setAttribute("style", "color:gray");
              }
              */
              //Changes the card components
              document.getElementById(cardId).innerHTML = lastMessage;
              document.getElementById(cardUserId).innerHTML = cardUser.id;
              document.getElementById(cardUserId).classList.add(cardUser.id);
              messageAppended = true;
            } else if (j === messages.length - 1) {
              //Last failed term or no messages has been sent
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
              document
                .getElementById(imgId)
                .setAttribute("class", "fas fa-ellipsis-v");
              /*
              document
                .getElementById(presId)
                .setAttribute("class", "fas fa-circle");
              //Check for user presence
              if (userArray[i].presence.state === "online") {
                document
                  .getElementById(presId)
                  .setAttribute("style", "color:green");
              } else {
                document
                  .getElementById(presId)
                  .setAttribute("style", "color:gray");
              }
              */
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
    //Access room messages and users
    currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        //New message
        onMessage: message => {
          for (let i = 0; i < 9; i++) {
            //Replace bubble with new message
            var onMessageHeader = document.getElementById("hd" + i.toString());
            if (onMessageHeader.innerHTML === message.senderId) {
              document.getElementById(i.toString()).innerHTML = message.parts[0].payload.content;
              //Add new message to log if appropriate
              if (message.senderId === logId) {
                const ul = document.getElementById("logList");
                var li = document.createElement("li");
                var div = document.createElement("div");
                div.innerHTML = message.parts[0].payload.content;
                div.setAttribute("class", "logContent");
                li.appendChild(div);
                ul.appendChild(li);
              }
            }
          }
        }
      },
      messageLimit: 0
    });

    //Send read cursor on load
    var listItems = $("#logList li");
    listItems.toArray().forEach(element => {
      var elementTop = element.offsetTop + 64;
      var elementBottom = element.offsetTop + element.offsetHeight + 64;
      isInViewport(element, elementTop, elementBottom);
    });
    //Send read cursor on scroll (The user might not always be at the bottom when more messages are sent)
    $("#logScrollDetect").scroll(() => {
      var listItems = $("#logList li");
      listItems.toArray().forEach(element => {
        var elementTop = element.offsetTop + 64;
        var elementBottom = element.offsetTop + element.offsetHeight + 64;
        isInViewport(element, elementTop, elementBottom);
      });
    })
    //Check if div is in viewport and sends the cursor
    function isInViewport (li, top, bot) {
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      var message = li.firstChild.innerHTML;
      if (top > viewportTop && bot < viewportBottom) {
        currentUser.fetchMultipartMessages({
          roomId: roomId,
          limit: 100
        })
        .then(messages => {
          //Find the message and sends a cursor based on message
          for (let m of messages) {
            if (m.parts[0].payload.content === message) {
              currentUser.setReadCursor({
                roomId: roomId,
                position: m.id
              });
            }
          }
        })
        .catch(err => console.error(err));
      }
    }
  })
  .catch(error => {
    console.error("error:", error);
  });
