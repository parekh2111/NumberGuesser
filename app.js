// @ts-nocheck

/*
GAME FUNCTION
-Player must guess a number between a min and max
-player gets a certain amount of guesses
-Noitfy player of guesses remaining
-Notify the player of the correct ansewer if losses
-Let player choose to play again 
*/ 

// Game values
		min=1,
		max = 10,
		winningNum = getRandomNum(min, max),
		guessesLeft = 3;
		
// UI Elements

const game = document.querySelector('#game'),
			minNum = document.querySelector('.min-num'),
			maxNum = document.querySelector('.max-num'),
			guessBtn = document.querySelector('#guess-btn'),
			guessInput = document.querySelector('#guess-input'),
			message = document.querySelector('.message');
// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max ;

//Play again event Listner
game.addEventListener('mousedown',function(e){
	if(e.target.className === 'play-again'){
		window.location.reload();
	}
})

// Listen for guess
guessBtn.addEventListener('click', function(){

	let guess = parseInt(guessInput.value);

	//Validate
	if( isNaN(guess) || guess < min || guess > max){
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	//check if Won
	if(guess === winningNum){

		gameOver(true,`${winningNum} is correct! ,  You win`);	
		
	}else{
		// Wrong number
		guessesLeft -= 1;

		if(guessesLeft === 0){

			// Game over Lost
			gameOver(false, `Game over, you lost. The Correct number was ${winningNum}. `)

		}else{
		
			// Game Continues - answer Wrong
			guessInput.style.borderColor = 'red';

			// Clear input
			guessInput.value = '';
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left `, 'red');
		}
	}
});

// Game over Function
function gameOver(won, msg){
	let color;
	won === true ? color = 'green' : color = 'red';
	guessInput.disabled = true;
	guessInput.style.borderColor = color;
	message.style.color = color;
	setMessage (msg);

	// play Again ?
	guessBtn.value = 'play-again';
	guessBtn.className += 'play-again';

}

//Get Winning Number Fucntion
function getRandomNum(min, max){
 return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message function

function setMessage(msg, color){
	message.style.color = color;
	message.textContent = msg;
}