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