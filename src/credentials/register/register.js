var username;
var password;
var pwEqual;

function checkPwConfirm() {
    var form = document.getElementById("regForm");
    var pw = form.elements[1].value
    var pwConfirm = form.elements[2].value
    if(pw === pwConfirm) {
        pwEqual = true;
        console.log(pwEqual);
	} else {
        pwEqual = false;
        console.log(pwEqual);
    }
}

function register() {
    var form = document.getElementById("regForm");
	var un = form.elements[0].value
    var pw = form.elements[1].value
	if(pwEqual === true) {
        console.log('Registered! username: ' + un + ' password: ' + pw)
        setPassword(pw)
        setUsername(un)
		return
	} else {
        console.log('Passwords do not match')
        return
    }
}

function setPassword(pw) {
    password = pw;
}

function setUsername(un) {
    username = un;
}