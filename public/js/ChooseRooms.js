
$(document).ready(() => {
  //Direct Message List button clicked
  $("#dmBtn").click(() => {
    // $("#dmBtn").removeClass();
    // $("#dmBtn").addClass("btn btn-primary rounded-0");
    // $("#roomBtn").removeClass();
    // $("#roomBtn").addClass("btn btn-dark rounded-0");
    //Change display properties
    chatManager
    .connect()
    .then(currentUser => {
      //Gets all user rooms in an array
      const userRooms = currentUser.rooms;
      var nCount = 0;
      var pCount = 0;
      //Loops through the user's rooms
      userRooms.forEach(element => {
        // console.log(element);
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
    $("#friendBtn").removeClass();
    $("#friendBtn").addClass("btn btn-primary d-block");
    $("#addFriendBtn").removeClass();
    $("#addFriendBtn").addClass("btn btn-primary d-block");
    $("#roomBtn1").removeClass();
    $("#roomBtn1").addClass("d-none");
    $("#roomBtn2").removeClass();
    $("#roomBtn2").addClass("d-none");
    $("#logBtn").removeClass();
    $("#logBtn").addClass("d-none");
    $("#bubBtn").removeClass();
    $("#bubBtn").addClass("d-none");
    $("#dm").removeClass();
    $("#dm").addClass("d-block");
    $("#log").removeClass();
    $("#log").addClass("d-none");
    $("#bub").removeClass();
    $("#bub").addClass("d-none");
    // $("#directmessageList-and-aux").removeClass();
    // $("#directmessageList-and-aux").addClass("col-9 mh-100 d-block");
    // $("#messageList-and-aux").removeClass();
    // $("#messageList-and-aux").addClass("d-none");
  });
  //Room List button clicked
  $("#roomBtn").click(() => {
    // $("#dmBtn").removeClass();
    // $("#dmBtn").addClass("btn btn-dark rounded-0");
    // $("#roomBtn").removeClass();
    // $("#roomBtn").addClass("btn btn-primary rounded-0");
    //Change display properties
    chatManager
    .connect()
    .then(currentUser => {
      //Gets all user rooms in an array
      const userRooms = currentUser.rooms;
      var nCount = 0;
      var pCount = 0;
      //Loops through the user's rooms
      userRooms.forEach(element => {
        // console.log(element);
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
    $("#roomBtn1").removeClass();
    $("#roomBtn1").addClass("btn btn-primary d-block");
    $("#roomBtn2").removeClass();
    $("#roomBtn2").addClass("btn btn-primary d-block");
    $("#friendBtn").removeClass();
    $("#friendBtn").addClass("d-none");
    $("#addFriendBtn").removeClass();
    $("#addFriendBtn").addClass("d-none");
    $("#logBtn").removeClass();
    $("#logBtn").addClass("btn btn-secondary rounded-0 d-block");
    $("#bubBtn").removeClass();
    $("#bubBtn").addClass("btn btn-primary rounded-0 d-block");
    $("#dm").removeClass();
    $("#dm").addClass("d-none");
    $("#log").removeClass();
    $("#log").addClass("d-none");
    $("#bub").removeClass();
    $("#bub").addClass("d-block");
    // $("#messageList-and-aux").removeClass();
    // $("#messageList-and-aux").addClass("col-9 mh-100 d-block");
    // $("#directmessageList-and-aux").removeClass();
    // $("#directmessageList-and-aux").addClass("d-none");
  });
});
