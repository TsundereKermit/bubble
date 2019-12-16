//Gets the ChatKit userId (identical to the Bubble username)
var username = document.getElementById("name").textContent;

//Gets the ChatKit roomId
var roomId = document.getElementById("roomId").textContent;

var dmName = document.getElementById("dmName".textContent);

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
      // console.log(element);
      if(element.isPrivate === false){
        console.log(element);
      //Makes a room input button for each room in the array
      var button = document.createElement("button");

      //Changes button profile for current room
      if (roomId === element.id) {
        button.setAttribute(
          "class",
          "btn btn-primary roomName rounded-0 w-100 px-0 mx-0 d-block"
        );
        button.setAttribute("id", "normalRoom" + nCount);
      } else {
        button.setAttribute(
          "class",
          "btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-block"
        );
        button.setAttribute("id", "normalRoom" + nCount);
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
      if(element.isPrivate === true){
        console.log(element);
      //Makes a room input button for each room in the array
      var button = document.createElement("button");
      //Changes button profile for current room
      if (dmName === element.name) {
        button.setAttribute(
          "class",
          "btn btn-primary roomName rounded-0 w-100 px-0 mx-0 d-none"
        );
      button.setAttribute("id", "privateRoom" + pCount);
      } else {
        button.setAttribute(
          "class",
          "btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-none"
        );
      button.setAttribute("id", "privateRoom" + pCount);
      }
      //Sets up data for POST request
      button.setAttribute("form", "changeRoomForm");
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