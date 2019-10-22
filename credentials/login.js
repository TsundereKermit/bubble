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
	var uName = form.elements[0].value
	var pWord = form.elements[1].value
	//Delete the following line after testing
	console.log('username: ' + uName + ' password: ' + pWord)
	//I need to get the usernames and passwords in an array somehow
	var objPeople = [
		{username: 'tonydagenius', password: '12345'}, 
		{username: 'TsundereKermit', password: '12345'}
	];
	for(var i = 0; i < objPeople.length; i++) {
		if(uName == objPeople[i].username && pWord == objPeople[i].password) {
			console.log(username.value + " is logged in!!!")
			return
		}
	}
	console.log('Credentials do not exist')
  }