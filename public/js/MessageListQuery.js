//DOM Manipulation
$(document).ready(() => {

  //Initializing the quoted string 
  var msgVal = "";

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

    //Setup kick user button
    var kickButton = document.getElementById("kickBtn");
    kickButton.value = logUsername;

    //Admin privileges
    if (userIsAdmin) {
      //user is admin
      if (username === logUsername) {
        //cannot kick self
        $("#kickBtn").hide();
      } else {
        $("#kickBtn").show();
      }
    } else {
      //not admin
      $("#kickBtn").hide();
    }

    //Hide other context menus (if applicable)
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

  //Handles button click events
  $("#context-menu button").on("click", e => {
    var target = e.target.id;
    switch (target) {
      case "logContextBtn":
        break;
      case "kickBtn":
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
    if (!userIsAdmin && logUsername !== username) {
      //Not admin nor bubble owner
      $("#delete").show();
      $("#delete").hide();
    } else if (!userIsAdmin && logUsername === username) {
      //Not admin but bubble owner
      $("#delete").show();
    } else {
      //Is admin
      $("#delete").show();
      $("#edit").show();
    }

    //Set up delete/quoting mechanisms
    $("#delete").val(logText);
    $("#quote").val(logText);

    //Hide other menus (if applicable)
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

  //Handles button click events
  $("#context-menu-2 button").on("click", e => {
    
    var target = e.target.id;
    switch (target) {
      case "quote":
        msgVal = "QMsg" + logText.length + "QEnd" + logText;
        $("#message-text").val(msgVal);
        break;
      case "delete":
        break;
      default:
        console.error("An error has occured...");
        break;
    }

    //Check for editing of the quoted string
    $("#message-text").keyup(() => {
      if ($("#message-text").val().indexOf(msgVal) === -1 && msgVal !== "") {
        $("#message-text").val("");
        msgVal = "";
      }
    });

    //Hides the menu after button click
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });

  $("[id^='img']").click(e => {

    //Gets target ID
    targetId = e.target.id; //Gets message text
    var userNumber = targetId.charAt(targetId.length - 1);
    logUsername = document.getElementById("hd" + userNumber).innerHTML;
    logText = document.getElementById(userNumber).innerHTML;
    var top = e.pageY;
    var left = e.pageX;

    //Changes log button based on username clicked
    var logButton = document.getElementById("dropdownLog");
    logButton.innerHTML = "ChatLog (" + logUsername + ")";
    logButton.value = logUsername;

    //Setup kick user button
    var kickButton = document.getElementById("dropKick");
    kickButton.value = logUsername;

    //Admin privileges
    if (userIsAdmin) {
      //user is admin
      if (username === logUsername) {
        //cannot kick self
        $("#dropKick").hide();
      } else {
        $("#dropKick").show();
      }
    } else {
      //not admin
      $("#dropKick").hide();
    }

    //Admin privileges
    if (!userIsAdmin && logUsername !== username) {
      //Not admin nor bubble owner
      $("#dropdownDelete").show();
      $("#dropdownDelete").hide();
    } else if (!userIsAdmin && logUsername === username) {
      //Not admin but bubble owner
      $("#dropdownDelete").show();
    } else {
      //Is admin
      $("#dropdownDelete").show();
    }

    //Set up delete/quoting mechanisms
    $("#dropdownDelete").val(logText);
    $("#dropdownQuote").val(logText);

    //Hide other menus (if applicable)
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
  
  //Handles button click events inside the contextmenu
  $("#context-menu-3 button").on("click", e => {

    var target = e.target.id;
    switch (target) {
      case "dropdownLog":
        break;
      case "dropdownFriend":
        console.log("Adding friend: " + logUsername);
        break;
      case "dropdownQuote":
        msgVal = "QMsg" + logText.length + "QEnd" + logText;
        $("#message-text").val(msgVal);
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

    //Check for editing the quoted string
    $("#message-text").keyup(() => {
      if ($("#message-text").val().indexOf(msgVal) === -1 && msgVal !== "") {
        $("#message-text").val("");
        msgVal = "";
      }
    });

    //Hide menu after button click
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });

  //Log text right click
  $(".logCardBody").contextmenu(e => {

    //Get target text
    var top = e.pageY;
    var left = e.pageX;
    logText = e.target.innerHTML;
    logUsername = document.getElementById("titId").innerHTML;

    //Administrative privileges
    if (!userIsAdmin && logUsername !== username) {
      //Not admin nor bubble owner
      $("#logRClickDelete").show();
      $("#logRClickDelete").hide();
    } else if (!userIsAdmin && logUsername === username) {
      //Not admin but bubble owner
      $("#logRClickDelete").show();
    } else {
      //Is admin
      $("#logRClickDelete").show();
      $("#logRClickEdit").show();
    }

    //Set up delete/quoting mechanisms
    $("#logRClickDelete").val(logText);
    $("#logRClickQuote").val(logText);

    //Hide context menu
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
  
  //Handles button click events (client side)
  $("#context-menu-4 button").on("click", e => {

    var target = e.target.id;
    switch (target) {
      case "logRClickQuote":
        msgVal = "QMsg" + logText.length + "QEnd" + logText;
        $("#message-text").val(msgVal);
        break;
      case "logRClickDelete":
        break;
      default:
        console.error("An error has occured...");
        break;
    }

    //Check for editing of the quoted string
    $("#message-text").keyup(() => {
      if ($("#message-text").val().indexOf(msgVal) === -1 && msgVal !== "") {
        $("#message-text").val("");
        msgVal = "";
      }
    });
    
    //Hides the menu after button click
    $(this)
      .parent()
      .removeClass("show")
      .hide();
  });
});