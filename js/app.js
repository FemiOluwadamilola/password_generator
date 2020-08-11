const lengthEl = document.getElementById('length'),
upperCaseEl = document.getElementById('uppercase'),
lowerCaseEl = document.getElementById('lowercase'),
numbersEl = document.getElementById('numbers'),
clipBoardEl = document.getElementById('clipboard'),
resultEl = document.getElementById('result'),
symbolsEl = document.getElementById('symbols')
generateBtn = document.getElementById('generate');

const genFunc = {
	lower:getRandomLower,
	upper:getRandomUpper,
	number:getRandomNumbers,
	symbol:getRandomSymbols
};

clipBoardEl.addEventListener('click',function(){
   const textArea = document.createElement('textarea');
   const password = resultEl.innerText;

   if(!password){
     return;
   }

   textArea.value = password;
   document.body.appendChild(textArea);

   textArea.select();

   document.execCommand('copy');
   textArea.remove();

   alert('password copied to clipboard!');

})
generateBtn.addEventListener('click', function(e){
  const haslength = +lengthEl.value;
  const hasUpper = upperCaseEl.checked;
  const hasLower = lowerCaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbols = symbolsEl.checked;


  resultEl.innerText = generatePassword(haslength,hasUpper,hasLower,hasSymbols,hasNumber);
});

 function generatePassword(length,upper,lower,symbols,number){
   let generatedPassword = '';

   const typesCount = upper + lower + symbols + number;

   const typesArr = [{upper},{lower},{symbols},{number}].filter(items => Object.values(items)[0]);

   if(typesCount === 0){
   	 return '';
   }

   for( let i = 0; i < length; i += typesCount ){
   	 typesArr.forEach(function(type){
   	 	 const typefunc = Object.keys(type)[0];

   	 	 generatedPassword += genFunc[typefunc](); // still having issues here...

   	 });
   }

   const finalPassword = generatedPassword.slice(0,length);

   return finalPassword;

   // console.log(generatedPassword);
 }




// generator functions
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26 ) + 97 );
}

function getRandomUpper(){
	return String.fromCharCode(Math.floor(Math.random() * 26 ) + 65 );
}

function getRandomNumbers() {
	return String.fromCharCode(Math.floor(Math.random() * 10 ) + 48 );
}

function getRandomSymbols() {
	const symbols = '!@#$%^&*(){}[]=<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)];
}