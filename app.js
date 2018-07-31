//variables
const keyboard = document.getElementsByTagName('button');
const phraseDiv = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const resetButton = document.querySelector('.btn__reset');
const phraseUl = document.querySelector('#phrase ul');
const overlayTitle = document.getElementsByClassName('title');
const subheading = document.getElementsByTagName('h4');
let missed = 0;
const phrases = [
	'Cristiano Ronaldo',
	'LeBron James',
	'Lionel Messi',
	'Neymar',
	'Roger Federer',
];

//functions
function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

function getRandomPhraseAsArray(arr){
	let randomNumber = Math.floor(Math.random() * arr.length);
	var phrase = arr[randomNumber];
	let splitPhrase = phrase.split('');
	return splitPhrase;
}

function addPhraseToDisplay(arr){
	for(let i = 0; i < arr.length; i++){
		let letter = document.createElement('li');
		letter.textContent = arr[i];
		if(isLetter(letter.textContent)){
			letter.className = 'letter'
		} else {
			letter.className = 'space'
		}
		phraseUl.append(letter);
	}
}

function checkLetter(e){
	let targetChar = e.target.textContent
	var letters = document.getElementsByClassName('letter');
	let matches = 0;
	for(var i = 0; i < letters.length; i++){
		var letter = letters[i];
		if(letter.textContent.toUpperCase() === targetChar.toUpperCase()){
			letter.classList.add('show');
			// let match = letter;
			matches += 1;
		}
	}
	if(matches === 0){
		return null;
	} else {
		return matches;
	}
}

function reset() {
	missed = 0;
	var myNode = document.getElementById("foo");
	while (phraseUl.firstChild) {
    phraseUl.removeChild(phraseUl.firstChild);
	}
	phraseArray = getRandomPhraseAsArray(phrases);
	addPhraseToDisplay(phraseArray);
	let keys = document.querySelectorAll('.keyrow button');
	for(let i = 0; i < keys.length; i++){
		keys[i].className = '';
		keys[i].disabled = false;
	}
	let hearts = document.querySelectorAll('.tries img');
	for(let i = 0; i < hearts.length; i++){
		hearts[i].src = 'images/liveHeart.png';
	}
}

function checkWin() {
	lettersShown = document.getElementsByClassName('show').length;
	lettersTotal = document.getElementsByClassName('letter').length;
	if (lettersShown === lettersTotal) {
		overlay.className = 'win'
		overlay.style.display = 'flex';
		overlayTitle[0].textContent = 'You Win!';
		resetButton.textContent = 'Play Again';
		subheading[0].textContent = 'Can You Guess Another 1 of the 5 Most Famous Athletes of 2018?';
		answer.textContent = '';
		reset();
	} else if (lettersShown !== lettersTotal && missed >= 5) {
		overlay.className = 'lose'
		overlay.style.display = 'flex';
		overlayTitle[0].textContent = 'You Lose!';
		resetButton.textContent = 'Try Again';
		subheading[0].textContent = '';
		answer.textContent = 'The correct answer was: ' + phraseArray.join('');

		reset();
	}
}

function changeHearts(){
	let hearts = document.querySelectorAll('.tries img');
	for(let i = 0; i < missed; i++){
		hearts[i].src = 'images/lostHeart.png';
	}
}


//main script
resetButton.addEventListener('click', function(){
	overlay.style.display = 'none';
});
let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
let answer = document.createElement('h4');
overlay.insertBefore(answer, resetButton);
for(let i = 0; i < keyboard.length; i++){
	let button = keyboard[i];
	button.addEventListener('click', function(xxx){
		xxx.target.classList.add('chosen');
		xxx.target.disabled = true;
		let letterFound = checkLetter(xxx);
		if(letterFound === null){
			missed += 1;
		}
		changeHearts();
		checkWin();
	});
}
