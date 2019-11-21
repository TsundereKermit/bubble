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
    $("#friendBtn").addClass("d-block");
    $("#roomBtn1").removeClass();
    $("#roomBtn1").addClass("d-none");
    $("#roomBtn2").removeClass();
    $("#roomBtn2").addClass("d-none");
    //$("#roomBtn1").replaceWith("#friendBtn");
    //$("#roomBtn2").replaceWith("#friendBtn");
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
    $("#roomBtn1").addClass("d-block");
    $("#roomBtn2").removeClass();
    $("#roomBtn2").addClass("d-block");
    $("#friendBtn").removeClass();
    $("#friendBtn").addClass("d-none");
    //$("#friendBtn").replaceWith("#roomBtn1");
    //$("#friendBtn").replaceWith("#roomBtn2");
  });
});
