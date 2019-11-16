$(document).ready(() => {
  //Set the height of each bubble
  var viewportHeight = $(window).height();
  var bubbleHeight = (viewportHeight - 70) / 3;
  $(".bubbleRow").height(bubbleHeight);
  //Chat log button clicked
  $("#logBtn").click(() => {
    //Change button color
    $("#logBtn").removeClass();
    $("#logBtn").addClass("btn btn-primary rounded-0");
    $("#bubBtn").removeClass();
    $("#bubBtn").addClass("btn btn-secondary rounded-0");
    //Change display properties
    $("#log").removeClass();
    $("#log").addClass("d-block");
    $("#bub").removeClass();
    $("#bub").addClass("d-none");
  });
  //Bubble button clicked
  $("#bubBtn").click(() => {
    //Change button color
    $("#logBtn").removeClass();
    $("#logBtn").addClass("btn btn-secondary rounded-0");
    $("#bubBtn").removeClass();
    $("#bubBtn").addClass("btn btn-primary rounded-0");
    //Change display properties
    $("#bub").removeClass();
    $("#bub").addClass("d-block");
    $("#log").removeClass();
    $("#log").addClass("d-none");
  });

  var targetId;
  var logUsername;
  //Username right click
  $(".usernameH5").on("contextmenu", function(e) {
    var top = e.pageY;
    var left = e.pageX;
    $("#context-menu-2").hide();
    $("#context-menu-3").hide();
    $("#context-menu")
      .css({
        display: "block",
        top: top,
        left: left
      })
      .addClass("show");
    return false; //blocks default Webbrowser right click menu
  });
  //Hide contextmenu when body is clicked
  $("body").click(() => {
    $("#context-menu").hide();
  });
  $("#context-menu button").on("click", function() {
    var userNumber = targetId.charAt(targetId.length - 1);
    logUsername = document.getElementById("hd" + userNumber).innerHTML;
    console.log(logUsername);
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });

  //Bubble text right click
  $(".bubbleContent").on("contextmenu", function(e) {
    var top = e.pageY;
    var left = e.pageX;
    $("#context-menu").hide();
    $("#context-menu-3").hide();
    $("#context-menu-2")
      .css({
        display: "block",
        top: top,
        left: left
      })
      .addClass("show");
    return false; //blocks default Webbrowser right click menu
  });
  //Hide contextmenu when body is clicked
  $("body").click(() => {
    $("#context-menu-2").hide();
  });
  $("#context-menu-2 button").on("click", function() {
    //Not sure what to do here
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });

  $("[id^='img']").click(e => {
    targetId = e.target.id;
    var top = e.pageY;
    var left = e.pageX;
    $("#context-menu").hide();
    $("#context-menu-2").hide();
    $("#context-menu-3")
      .css({
        display: "block",
        top: top,
        left: left
      })
      .addClass("show");
    return false; //blocks default Webbrowser right click menu
  });
  //Hide contextmenu when body is clicked
  $("body").click(() => {
    $("#context-menu-3").hide();
  });
  $("#context-menu-3 button").on("click", e => {
    var target = e.target.id;
    var userNumber = targetId.charAt(targetId.length - 1);
    logUsername = document.getElementById("hd" + userNumber).innerHTML;
    switch (target) {
      case "dropdownLog":
        console.log("Chatlog for user: " + logUsername);
        break;
      case "dropdownFriend":
        console.log("Adding friend: " + logUsername);
        break;
      case "":
        console.log("To be implemented...");
        break;
      //TODO More cases for the other buttons to come...
      default:
        console.error("One singular yike.");
    }
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });
});
