//Gets the ChatKit userId (identical to the Bubble username)
var username = document.getElementById("name").textContent;

//Gets the ChatKit roomId
//This was commented it out as it is broken, reject this change
//var dmId = document.getElementById("dmId").textContent;

chatManager
  .connect()
  //Renders the messages from the first room that the user is in
  .then(currentUser => {
    const div = document.getElementById("dmList");
    //Gets all user rooms in an array
    const userDMRooms = currentUser.dmRooms;
    //Loops through the user's rooms
    userDMRooms.forEach(element => {
      //Makes a room input button for each room in the array
      var button = document.createElement("button");
      if (dmId === element.id) {
        button.setAttribute(
          "class",
          "btn btn-primary roomName rounded-0 w-100 px-0 mx-0"
        );
      } else {
        button.setAttribute(
          "class",
          "btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0"
        );
      }
      button.setAttribute("form", "changeDMForm");
      button.setAttribute("type", "submit");
      button.setAttribute("id", element.id);
      button.setAttribute("value", element.id);
      button.setAttribute("name", "changeDMName");
      button.innerHTML = element.name;
      div.appendChild(button);
    });
  })
  .catch(error => {
    console.error("error:", error);
  });
