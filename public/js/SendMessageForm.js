//Gets the ChatKit userId (identical to the Bubble username)
var username = document.getElementById("name").textContent;

//Gets the ChatKit roomId
var roomId = document.getElementById("roomId").textContent;

chatManager
  //Connect to chatkit servers
  .connect()
  .then(currentUser => {
    //Default room
    if (roomId === "jPBGwdGQli") {
      roomId = currentUser.rooms[0].id;
    }
    const form = document.getElementById("message-form");
    //When the message input is detected, a simple mesage is sent to the chatkit servers
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = document.getElementById("message-text");
      //Sending input
      currentUser
        .sendSimpleMessage({
          text: input.value,
          roomId: roomId
        })
        .then()
        .catch(err => console.error(err));
      //Clear input form
      input.value = "";
    });
  })
  .catch(error => {
    console.error("error:", error);
  });
