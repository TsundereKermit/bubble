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

chatManager
  .connect()
  .then(currentUser => {

    //Default room
    if (roomId === "jPBGwdGQli") {
      roomId = currentUser.rooms[0].id;
      document.getElementById("deleteMsgRoom").value = roomId;
      document.getElementById("quoteMsgRoom").value = roomId;
    } else { //Not 1st room
      document.getElementById("deleteMsgRoom").value = roomId;
      document.getElementById("quoteMsgRoom").value = roomId;
    }

    //Get messages in roomId
    currentUser.fetchMultipartMessages({
        roomId: roomId,
        direction: "older",
        limit: 100
      })
      .then(messages => {

        //Chat log mode
        const ul = document.getElementById("dmList");
        //Adds the message to the log if it belongs to the user
        messages.forEach(element => {
            var li = document.createElement("li");
            var div = document.createElement("div");

            //Get msg from element for inputting into the log div
            var dmMsg = element.parts[0].payload.content;

            //Check for quoting
            if (dmMsg.indexOf("QMsg") === 0) {
              //Get quoted message and actual message
              var dmLenEnd = dmMsg.indexOf("QEnd");
              var dmMessageLength = parseInt(dmMsg.substring(4, dmLenEnd));
              dmMsg = dmMsg.substr(dmLenEnd + dmMessageLength + 4);
            }

            //Set div text
            div.innerHTML = dmMsg;

            div.setAttribute("class", "dmContent");
            li.appendChild(div);
            ul.appendChild(li);
          
        });

        //Set chat log title
        const h5 = document.getElementById("titId");
        h5.innerHTML = logId;

        //Get the room that the MessageList should display based on roomId
        currentRooms.forEach(element => {
          if (element.id === roomId) {
            thisRoom = element;
          }
        });
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

              //Add new message to log if appropriate
                const ul = document.getElementById("dmList");
                var li = document.createElement("li");
                var div = document.createElement("div");

                var DMInnerHTML = message.parts[0].payload.content;
                //Check for quoting
                if (DMInnerHTML.indexOf("QMsg") === 0) {
                  //Get quoted message and actual message
                  var newDMLenEnd = DMInnerHTML.indexOf("QEnd");
                  var newDMMessageLength = parseInt(DMInnerHTML.substring(4, newDMLenEnd));
                  DMInnerHTML = DMInnerHTML.substr(newDMLenEnd + newDMMessageLength + 4);
                }
                div.innerHTML = DMInnerHTML;

                div.setAttribute("class", "dmContent");
                li.appendChild(div);
                ul.appendChild(li);
        }
      },
      messageLimit: 0
    });

    //This block comment is for DM mode read cursors
    /*
    if($("#log").is(":visible")) {
      currentUser.fetchMultipartMessages({
        roomId: roomId,
        limit: 1
      })
      .then(messages => {
        //Find the message and sends a cursor based on message
        for (let m of messages) {
          currentUser.setReadCursor({
            roomId: roomId,
            position: m.id
          })
          .then()
          .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err));
    }
    */
  })
  .catch(error => {
    console.error("error:", error);
  });