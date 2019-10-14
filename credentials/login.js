var objPeople = [
	{ 
		username: "test1",
		password: "12345"
	},
	{ 
		username: "test2",
		password: "12345"
	}
]
function getInfo() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    for(var i = 0; i < objPeople.length; i++) {
		if(username == objPeople[i].username && password == objPeople[i].password) {
			console.log(username + " is logged in!!!")
			return
		}
	}
	console.log("incorrect username or password")
}