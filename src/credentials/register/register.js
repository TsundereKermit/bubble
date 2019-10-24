var username;
var password;

function register() {
    var form = document.getElementById("regForm");
	var un = form.elements[0].value
    var pw = form.elements[1].value
    var pwConfirm = form.elements[2].value
    //This will be done with php later
	if(pw === pwConfirm) {
        console.log('Registered! username: ' + un + ' password: ' + pw)
        setPassword(pw)
        setUsername(un)
		return
	} else {
        console.log('Passwords do not match')
    }
}

function setPassword(pw) {
    password = pw;
}

function setUsername(un) {
    username = un;
}