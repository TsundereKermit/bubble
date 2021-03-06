//Gets the ChatKit userId (identical to the Bubble username)
var username = document.getElementById("name").textContent;

//Gets the ChatKit roomId
var roomId = document.getElementById("roomId").textContent;

//Gets the room type specified from index
var roomType = document.getElementById("roomType").textContent;

chatManager
  .connect()
  //Renders the messages from the first room that the user is in
  .then(currentUser => {
    var nCount = 0;
    var pCount = 0;
    const div = document.getElementById("roomList");

    //Gets all user rooms in an array
    const userRooms = currentUser.rooms;

    //Loops through the user's rooms
    userRooms.forEach(element => {
      //Checks if the room is public
      if(element.isPrivate === false){
        console.log(element);
      //Makes a room input button for each public room in the array
      var button = document.createElement("button");

      //Changes button profile for current room
      if (roomId === element.id) {
        //Depending on the room type, the buttons will be defaultly hidden or shown 
        if(roomType === 'normal'){
          button.setAttribute(
            "class",
            "btn btn-primary roomName rounded-0 w-100 px-0 mx-0 d-block"
          );
          button.setAttribute("id", "normalRoom" + nCount);
        }else if(roomType === 'DM'){
          button.setAttribute(
            "class",
            "btn btn-primary roomName rounded-0 w-100 px-0 mx-0 d-none"
          );
          button.setAttribute("id", "normalRoom" + nCount);
        }
      } else {
        if(roomType === 'normal'){
        button.setAttribute(
          "class",
          "btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-block"
        );
        button.setAttribute("id", "normalRoom" + nCount);
        }else if(roomType === 'DM'){
          button.setAttribute(
            "class",
            "btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-none"
          );
          button.setAttribute("id", "normalRoom" + nCount);
        }
      }
      
      //Sets up data for POST request
      button.setAttribute("form", "changeRoomForm");
      button.setAttribute("type", "submit");
      button.setAttribute("value", element.id);
      button.setAttribute("name", "changeRoomName");
      button.innerHTML = element.name;
      div.appendChild(button);
      console.log(button.id);
      nCount++;
    }
    });

    userRooms.forEach(element => {
      //Checks if the room is private
      if(element.isPrivate === true){
        console.log(element);
      //Makes a room input button for each private room in the array
      var button = document.createElement("button");
      //Changes button profile for current room
      if (roomId === element.id) {
        //Depending on the room type, the buttons will be defaultly hidden or shown
        if(roomType === 'DM'){
          button.setAttribute(
            "class",
            "btn btn-primary roomName rounded-0 w-100 px-0 mx-0 d-block"
          );
          button.setAttribute("id", "privateRoom" + pCount);
        }else if(roomType === 'normal'){
          button.setAttribute(
            "class",
            "btn btn-primary roomName rounded-0 w-100 px-0 mx-0 d-none"
          );
          button.setAttribute("id", "privateRoom" + pCount);
        }
      } else {
        if(roomType === 'DM'){
          button.setAttribute(
            "class",
            "btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-block"
          );
          button.setAttribute("id", "privateRoom" + pCount);
        }else if(roomType === 'normal'){
          button.setAttribute(
            "class",
            "btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-none"
          );
          button.setAttribute("id", "privateRoom" + pCount);
        }
      }
      //Sets up data for POST request
      button.setAttribute("form", "changeDMForm");
      button.setAttribute("type", "submit");
      button.setAttribute("value", element.id);
      button.setAttribute("name", "changeRoomName");
      button.innerHTML = element.name;
      div.appendChild(button);
      console.log(button.id);
      pCount++;
    }
    })
  })
  .catch(error => {
    console.error("error:", error);
  });