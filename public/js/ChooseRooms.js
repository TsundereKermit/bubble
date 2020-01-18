$(document).ready(() => {
  //Direct Message List button clicked
  $("#dmBtn").click(() => {
    //Change display properties
    //Hides all the normal room buttons and shows the private room buttons
    chatManager
    .connect()
    .then(currentUser => {
      //Gets all user rooms in an array
      const userRooms = currentUser.rooms;
      var nCount = 0;
      var pCount = 0;
      //Loops through the user's rooms
      userRooms.forEach(element => {
        if(element.isPrivate === false){
          $("#normalRoom" + nCount).removeClass();
          $("#normalRoom" + nCount).addClass("btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-none");      
          nCount++;
        }
        if(element.isPrivate === true){
          $("#privateRoom" + pCount).removeClass();
          $("#privateRoom" + pCount).addClass("btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-block");
          pCount++;
        }
      })
    })
    //Hides the create and join room buttons and shows the create dm and add friend buttons
    $("#friendBtn").removeClass();
    $("#friendBtn").addClass("btn btn-primary d-block");
    $("#addFriendBtn").removeClass();
    $("#addFriendBtn").addClass("btn btn-primary d-block");
    $("#roomBtn1").removeClass();
    $("#roomBtn1").addClass("d-none");
    $("#roomBtn2").removeClass();
    $("#roomBtn2").addClass("d-none");
    //Hides the chat log and bubble mode buttons
    $("#logBtn").removeClass();
    $("#logBtn").addClass("d-none");
    $("#bubBtn").removeClass();
    $("#bubBtn").addClass("d-none");
    //Hides the bubble mode ui and shows the dm ui
    $("#dm").removeClass();
    $("#dm").addClass("d-block");
    $("#log").removeClass();
    $("#log").addClass("d-none");
    $("#bub").removeClass();
    $("#bub").addClass("d-none");
  });
  //Room List button clicked
  $("#roomBtn").click(() => {
    //Change display properties
    //Hides all the private room buttons and shows the public room buttons
    chatManager
    .connect()
    .then(currentUser => {
      //Gets all user rooms in an array
      const userRooms = currentUser.rooms;
      var nCount = 0;
      var pCount = 0;
      //Loops through the user's rooms
      userRooms.forEach(element => {
        if(element.isPrivate === false){
          $("#normalRoom" + nCount).removeClass();
          $("#normalRoom" + nCount).addClass("btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-block");      
          nCount++;
        }
        if(element.isPrivate === true){
          $("#privateRoom" + pCount).removeClass();
          $("#privateRoom" + pCount).addClass("btn btn-outline-primary roomName rounded-0 w-100 px-0 mx-0 d-none");
          pCount++;
        }
      })
    })
    //Hides the create dm and add friend buttons and shows the create room and join room buttons
    $("#roomBtn1").removeClass();
    $("#roomBtn1").addClass("btn btn-primary d-block");
    $("#roomBtn2").removeClass();
    $("#roomBtn2").addClass("btn btn-primary d-block");
    $("#friendBtn").removeClass();
    $("#friendBtn").addClass("d-none");
    $("#addFriendBtn").removeClass();
    $("#addFriendBtn").addClass("d-none");
    //Shows the chat log and bubble mode buttons
    $("#logBtn").removeClass();
    $("#logBtn").addClass("btn btn-secondary rounded-0 d-block");
    $("#bubBtn").removeClass();
    $("#bubBtn").addClass("btn btn-primary rounded-0 d-block");
    //Hides the dm ui and shows the bubble mode ui
    $("#dm").removeClass();
    $("#dm").addClass("d-none");
    $("#log").removeClass();
    $("#log").addClass("d-none");
    $("#bub").removeClass();
    $("#bub").addClass("d-block");
  });
});
