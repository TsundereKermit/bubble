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

  //Context menus
  var targetId;
  var logUsername;
  var logText;
  //Username right click
  $(".usernameH5").contextmenu(e => {
    //Gets target ID
    targetId = e.target.id;
    var top = e.pageY;
    var left = e.pageX;
    //Gets username
    var userNumber = targetId.charAt(targetId.length - 1);
    logUsername = document.getElementById("hd" + userNumber).innerHTML;
    //Changes chatlog button to suit the username clicked
    var logButton = document.getElementById("logContextBtn");
    logButton.innerHTML = "ChatLog (" + logUsername + ")";
    logButton.value = logUsername;
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
  $("#context-menu button").on("click", e => {
    var target = e.target.id;
    //Handles button click events
    switch (target) {
      case "log":
        break;
      case "friend":
        console.log("Adding friend with username: " + logUsername);
        break;
      case "block": 
        console.log("Blocking user: " + logUsername);
        break;
      default: 
        console.error("An error has occured...");
        break;
    }
    //Hides menu after button click
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });

  //Bubble text right click
  $(".bubbleContent").contextmenu(e => {
    //Get target ID
    targetId = e.target.id;
    var top = e.pageY;
    var left = e.pageX;
    //Gets message text
    var userNumber = targetId.charAt(targetId.length - 1);
    logUsername = document.getElementById("hd" + userNumber).innerHTML;
    logText = document.getElementById(userNumber).innerHTML;
    //Admin privileges
    if (!userIsAdmin && logUsername !== username) { //Not admin nor bubble owner
      $("#delete").show();
      $("#delete").hide();
    } else if (!userIsAdmin && logUsername === username) { //Not admin but bubble owner
      $("#delete").show();
      $("#delete").hide();
    } else { //Is admin
      $("#delete").show();
      $("#edit").show();
    }
    $("#delete").val(logText);
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
  $("#context-menu-2 button").on("click", e => {
    var target = e.target.id;
    //Handles button click events
    switch (target) {
      case "quote": 
        console.log("Quoting message: " + logText);
        break;
      case "delete":
        break;
      default: 
        console.error("An error has occured...");
        break;
    }
    //Hides the menu after button click
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });

  $("[id^='img']").click(e => {
    //Gets target ID
    targetId = e.target.id;//Gets message text
    var userNumber = targetId.charAt(targetId.length - 1);
    logUsername = document.getElementById("hd" + userNumber).innerHTML;
    logText = document.getElementById(userNumber).innerHTML;
    //Changes log button based on username clicked
    var logButton = document.getElementById("dropdownLog");
    logButton.innerHTML = "ChatLog (" + logUsername + ")";
    logButton.value = logUsername;
    //Admin privileges
    if (!userIsAdmin && logUsername !== username) { //Not admin nor bubble owner
      $("#dropdownDelete").show();
      $("#dropdownDelete").hide();
    } else if (!userIsAdmin && logUsername === username) { //Not admin but bubble owner
      $("#dropdownDelete").show();
      $("#dropdownDelete").hide();
    } else { //Is admin
      $("#dropdownDelete").show();
    }
    $("#dropdownDelete").val(logText);
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
  //Handles onclick events inside the contextmenu
  $("#context-menu-3 button").on("click", e => {
    var target = e.target.id;
    //Handles button click events
    switch (target) {
      case "dropdownLog":
        break;
      case "dropdownFriend":
        console.log("Adding friend: " + logUsername);
        break;
      case "dropdownQuote":
        console.log("Quote: " + logText);
        break;
      case "dropdownDelete":
        break;
      case "dropdownBlock": 
        console.log("Block: " + logUsername);
        break;
      case "":
        console.log("To be implemented...");
        break;
      default:
        console.error("An error has occured...");
        break;
    }
    //Hide menu after button click
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });

  //Log text right click
  $(".logCardBody").contextmenu(e => {
    console.log("log");
    var top = e.pageY;
    var left = e.pageX;
    logText = e.target.innerHTML;
    logUsername = document.getElementById("titId").innerHTML;
    if (!userIsAdmin && logUsername !== username) { //Not admin nor bubble owner
      $("#logRClickDelete").show();
      $("#logRClickDelete").hide();
    } else if (!userIsAdmin && logUsername === username) { //Not admin but bubble owner
      $("#logRClickDelete").show();
      $("#logRClickDelete").hide();
    } else { //Is admin
      $("#logRClickDelete").show();
      $("#logRClickEdit").show();
    }
    $("#logRClickDelete").val(logText);
    $("#context-menu-4")
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
    $("#context-menu-4").hide();
  });
  $("#context-menu-4 button").on("click", e => {
    //Hides the menu after button click
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });
});
