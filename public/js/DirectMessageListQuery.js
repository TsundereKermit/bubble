//DOM Manipulation
$(document).ready(() => {

    //Initializing the quoted string 
    var msgVal = "";
  
    //Context menus
    var dmUsername;
    var dmText;
  
    //DM text right click
    $(".dmCardBody").contextmenu(e => {
  
      //Get target text
      var top = e.pageY;
      var left = e.pageX;
      dmText = e.target.innerHTML;
      dmUsername = document.getElementById("titId").innerHTML;
  
      //Set up delete/quoting mechanisms
      $("#dmRClickDelete").val(dmText);
      $("#dmRClickQuote").val(dmText);
  
      //Hide context menu
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
    
    //Handles button click events (client side)
    $("#context-menu button").on("click", e => {
  
      var target = e.target.id;
      switch (target) {
        case "dmRClickQuote":
          msgVal = "'Quote: " + dmText + "' ";
          $("#message-text").val(msgVal);
          break;
        case "dmRClickDelete":
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