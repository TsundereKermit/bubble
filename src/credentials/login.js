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

function testFunction() {
	var form = document.getElementById("pwForm");
	var un = form.elements[0].value
	var pw = form.elements[1].value
	//Delete the following line after testing
	console.log('username: ' + un + ' password: ' + pw)
	//I need to get the usernames and passwords in an array somehow
	var objPeople = [
		{username: 'tonydagenius', password: '12345'}, 
		{username: 'TsundereKermit', password: '12345'}
	];
	for(var i = 0; i < objPeople.length; i++) {
		if(un == objPeople[i].username && pw == objPeople[i].password) {
			console.log(un + " is logged in!!!")
			window.location.replace("../index.html");
			return
		}
	}
	console.log('Credentials do not exist')
  }