$(document).ready(() => {
  //Direct Message List button clicked
  $("#dmBtn").click(() => {
    $("#dmBtn").removeClass();
    $("#dmBtn").addClass("btn btn-primary rounded-0");
    $("#roomBtn").removeClass();
    $("#roomBtn").addClass("btn btn-secondary rounded-0");
    //Change display properties
    $("#dmList").removeClass();
    $("#dmList").addClass("d-block");
    $("#roomList").removeClass();
    $("#roomList").addClass("d-none");
    $("#friendBtn").removeClass();
    $("#friendBtn").addClass("btn btn-primary d-block");
    $("#roomBtn1").removeClass();
    $("#roomBtn1").addClass("d-none");
    $("#roomBtn2").removeClass();
    $("#roomBtn2").addClass("d-none");
    $("#logBtn").removeClass();
    $("#logBtn").addClass("d-none");
    $("#bubBtn").removeClass();
    $("#bubBtn").addClass("d-none");
    $("#messageList-and-aux").removeClass();
    $("#messageList-and-aux").addClass("d-none");
    $("#directMessageList-and-aux").removeClass();
    $("#directMessageList-and-aux").addClass("col-9 mh-100 d-block");
  });
  //Room List button clicked
  $("#roomBtn").click(() => {
    $("#dmBtn").removeClass();
    $("#dmBtn").addClass("btn btn-secondary rounded-0");
    $("#roomBtn").removeClass();
    $("#roomBtn").addClass("btn btn-primary rounded-0");
    //Change display properties
    $("#roomList").removeClass();
    $("#roomList").addClass("d-block");
    $("#dmList").removeClass();
    $("#dmList").addClass("d-none");
    $("#roomBtn1").removeClass();
    $("#roomBtn1").addClass("btn btn-primary d-block");
    $("#roomBtn2").removeClass();
    $("#roomBtn2").addClass("btn btn-primary d-block");
    $("#friendBtn").removeClass();
    $("#friendBtn").addClass("d-none");
    $("#logBtn").removeClass();
    $("#logBtn").addClass("btn btn-secondary d-block");
    $("#bubBtn").removeClass();
    $("#bubBtn").addClass("btn btn-primary d-block");
    $("#messageList-and-aux").removeClass();
    $("#messageList-and-aux").addClass("col-9 mh-100 d-block");
    $("#directMessageList-and-aux").removeClass();
    $("#directMessageList-and-aux").addClass("d-none");
  });
});
