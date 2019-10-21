/*
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
*/

function fieldFocus(field, text) {
   if(field.value == text)
   {
     field.value = '';
   }
}

function fieldBlur(field, text) {
   if(field.value == '')
   {
     field.value = text;
   }
}

//Fade in dashboard box
$(document).ready(function(){
    $('.box').hide().fadeIn(1000);
    });

//Stop click event
$('btn').click(function(event){
    event.preventDefault(); 
	});