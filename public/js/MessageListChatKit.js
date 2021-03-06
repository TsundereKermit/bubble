//Gets the ChatKit userId (identical to the Bubble username)
var username = document.getElementById("name").textContent;

//Gets the ChatKit roomId
var roomId = document.getElementById("roomId").textContent;

//Gets the ChatKit roomId
var logId = document.getElementById("logId").textContent;

//Initialize token provider with ChatKit test endpoint
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
      document.getElementById("quoteMsgRoom").value = roomId;
      document.getElementById("kickUserRoomId").value = roomId;
      document.getElementById("dropKick").value = roomId;
    } else { //Not 1st room
      document.getElementById("deleteMsgRoom").value = roomId;
      document.getElementById("quoteMsgRoom").value = roomId;
      document.getElementById("kickUserRoomId").value = roomId;
      document.getElementById("dropKick").value = roomId;
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

            //Get msg from element for inputting into the log div
            var logMsg = element.parts[0].payload.content;

            //Check for quoting
            if (logMsg.indexOf("QMsg") === 0) {
              //Get quoted message and actual message
              var logLenEnd = logMsg.indexOf("QEnd");
              var logMessageLength = parseInt(logMsg.substring(4, logLenEnd));
              logMsg = logMsg.substr(logLenEnd + logMessageLength + 4);
            }

            //Set div text
            div.innerHTML = logMsg;

            div.setAttribute("class", "logContent");
            li.appendChild(div);
            ul.appendChild(li);
          }
        });

        //Set chat log title
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

            //Message is sent by user
            if (messages[j].sender.id === cardUser.id) {
              
              //Gets the text portion of the most recent message
              lastMessage = messages[j].parts[0].payload.content;

              var quotedMessage = "";
              //Parse message for quoting
              //Is quoting a message
              if (lastMessage.indexOf("QMsg") === 0) {

                //Get quoted message and actual message
                var lenEnd = lastMessage.indexOf("QEnd");
                var messageLength = parseInt(lastMessage.substring(4, lenEnd));
                quotedMessage = lastMessage.substr(lenEnd + 4, messageLength);
                lastMessage = lastMessage.substr(lenEnd + messageLength + 4);

                //Change quote h6 innerHTML
                var quoteId = "quote" + i.toString();
                document.getElementById(quoteId).setAttribute("title", quotedMessage);
                document.getElementById(quoteId).innerHTML = "Quoting a message";
                
              } else {
                //Reset quoting h6
                document.getElementById("quote" + i.toString()).innerHTML = "";
              }

              //Get the card component ids
              var cardId = i.toString();
              var cardUserId = "hd" + cardId;
              var imgId = "img" + cardId;
              var presId = "pres" + cardId;
              
              //Add the setting button
              document.getElementById(imgId).setAttribute("class", "fas fa-ellipsis-v");

              //Changes the card components
              document.getElementById(cardId).innerHTML = lastMessage;
              document.getElementById(cardId).setAttribute("title", lastMessage);
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
              document.getElementById(imgId).setAttribute("class", "fas fa-ellipsis-v");

              //Changes the card components
              document.getElementById(cardId).innerHTML = lastMessage;
              document.getElementById(cardId).setAttribute("title", lastMessage);
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
        //New message received
        onMessage: message => {

          for (let i = 0; i < 9; i++) {
            //Replace bubble with new message
            var onMessageHeader = document.getElementById("hd" + i.toString());

            if (onMessageHeader.innerHTML === message.senderId) {
              var newMessage = message.parts[0].payload.content;
              document.getElementById(i.toString()).innerHTML = newMessage;

              //Reset quote h6
              document.getElementById("quote" + i.toString()).innerHTML = "";
              var newQuoteMsg = "";

              //Is quoting a message
              if (newMessage.indexOf("QMsg") === 0) {

                //Get quoted message and actual message
                var newLenEnd = newMessage.indexOf("QEnd");
                var newMessageLength = parseInt(newMessage.substring(4, newLenEnd));
                newQuoteMsg = newMessage.substr(newLenEnd + 4, newMessageLength);
                var newQuoteId = "quote" + i.toString();
                newMessage = newMessage.substr(newLenEnd + newMessageLength + 4);

                //Change quote h6 innerHTML
                document.getElementById(newQuoteId).setAttribute("title", newQuoteMsg);
                document.getElementById(newQuoteId).innerHTML = "Quoting a message";

                //Change bubble content 
                document.getElementById(i.toString()).innerHTML = newMessage;
              }

              //Add new message to log if appropriate
              if (message.senderId === logId) {
                const ul = document.getElementById("logList");
                var li = document.createElement("li");
                var div = document.createElement("div");

                var logInnerHTML = message.parts[0].payload.content;
                //Check for quoting
                if (logInnerHTML.indexOf("QMsg") === 0) {
                  //Get quoted message and actual message
                  var newLogLenEnd = logInnerHTML.indexOf("QEnd");
                  var newLogMessageLength = parseInt(logInnerHTML.substring(4, newLogLenEnd));
                  logInnerHTML = logInnerHTML.substr(newLogLenEnd + newLogMessageLength + 4);
                }
                div.innerHTML = logInnerHTML;

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
  })
  .catch(error => {
    console.error("error:", error);
  });