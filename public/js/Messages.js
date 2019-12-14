//Error messages modal popup
$(document).ready(() => {
    $("#modalCloseBtn").click(() => {
        $("#errorModal").removeClass("d-block");
        $("#errorModal").addClass("d-none");
    });
});