$(document).ready(() => {
  //Friend List button clicked
  $("#friBtn").click(() => {
    $("#friBtn").removeClass();
    $("#friBtn").addClass("btn btn-primary rounded-0");
    $("#roomBtn").removeClass();
    $("#roomBtn").addClass("btn btn-secondary rounded-0");
  });
  //Room List button clicked
  $("#roomBtn").click(() => {
    $("#friBtn").removeClass();
    $("#friBtn").addClass("btn btn-secondary rounded-0");
    $("#roomBtn").removeClass();
    $("#roomBtn").addClass("btn btn-primary rounded-0");
  });
});
