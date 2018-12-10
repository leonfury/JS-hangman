	const displayAnswer = document.getElementById('displayAnswer');
	const guessedLetter = document.getElementById('guessedLetter');
	const printChance = document.getElementById('chancesRem');
	const playerEntry = document.getElementById('playerEntry');
	const levelSelected = document.getElementById('levelSelected');
	const startButton = document.getElementById('initialization');
	const gameBody = document.getElementById('gameBody');
	const inputArea = document.getElementById('inputArea');

	let lvlEasy = ["askew", "bandwagon", "buzzwords", "embezzle", "megahertz","thumbscrew", "zigzagging"]
	let lvlHard = ["fluorescent", "accommodate", "psychiatrist", "occasionally", "questionnaire", "minuscule"];

//2. assign guess word
	//selected word is input to guessWord
	let guessWord; //string
	let answer =[]; //store answer array
	let playerLetters = []; //store user input
	let userEntryStr = ""; //player entry
	let chances; //guessing chances

//1. user select difficulty
	//player clicks button
	function chooseLevelEasy () {
		guessWord = lvlEasy[ Math.floor( Math.random() * lvlEasy.length) ];
		levelSelected.innerHTML = "Easy";
		chances = 5;
		startButton.classList.remove('hide');
	}

	function chooseLevelHard () {
		guessWord = lvlHard[ Math.floor( Math.random() * lvlHard.length) ];
		levelSelected.innerHTML = "Hard";	
		chances = 5;
		startButton.classList.remove('hide');
	}

	function chooseLevelImpossible () {
		guessWord = lvlHard[ Math.floor( Math.random() * lvlHard.length) ];
		levelSelected.innerHTML = "IMPOSSIBLE";	
		chances = 1;
		startButton.classList.remove('hide');
		printChanceRem ();
	}	
	//chosen array initializes randomly

	function initialization() {
		//reset the field
		answer =[]; 
		playerLetters = [];
		guessedLetter.innerHTML = "";
		//split guess-Word to array
		guessWordArr = guessWord.split(""); 
		//create array for answer
		for (let i = 0; i < guessWord.length; i++) answer.unshift("_");
		gameBody.classList.remove('hide');
		inputArea.classList.remove('hide');
		startButton.classList.add('hide');
		printAnswer();
		printChanceRem ();
	}

//prints answer on page
	function printAnswer () {
		displayAnswer.innerHTML = " "; //clear screen answer
		for (let i = 0; i < answer.length; i++) {
			displayAnswer.innerHTML = displayAnswer.innerHTML + answer[i] + " ";
		}
	}  

//printes guessed words on page
	function printLetter () {
		guessedLetter.innerHTML = "";
		playerLetters.sort();

		for (i = 0; i < playerLetters.length; i++) {
			const newGuessLetter = document.createElement('li');
			newGuessLetter.innerHTML = playerLetters[i];
			guessedLetter.appendChild(newGuessLetter);
		}
	} 

//updates counter
	function printChanceRem () {
		printChance.innerHTML = chances;
		if (chances <= 1) printChance.style.color = "red";
		if (chances > 2) printChance.style.color = "blue";
	}

//enable enter as entry
	playerEntry.addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode === 13) { //keycode 13 is enter button
	        checkLetter();
	    }
	});

//triggered by player input ***GAME LOGIC HERE***
	function checkLetter() {
		//player input value
		userEntryStr = document.querySelector('#playerEntry').value;

		//checks user input - prompt when input empty
		if (userEntryStr == "") {
			window.alert(`Can't hear you, please type louder!`);
			return ;
		}

		if (userEntryStr.length > 1) {
			window.alert(`Please insert one alphabet at a time!`);
			document.querySelector('#playerEntry').value = ""; 	
			return ;
		}

		//checks user input with prev guess words
		if ( playerLetters.includes(userEntryStr) ) {
			window.alert(`This letter has already been guessed, input another`);
			document.querySelector('#playerEntry').value = ""; 
			return ;
		}

		//update player input letter to storage & print
		playerLetters.push(userEntryStr);
		printLetter ();

		//if player letter correct then swap letter between answer&guessWordArray
		if ( guessWordArr.includes(userEntryStr) ) {

			while ( guessWordArr.includes(userEntryStr)) {
				let pos = guessWordArr.indexOf(userEntryStr,0);
				answer.splice(pos, 1, userEntryStr);
				guessWordArr.splice(pos,1,"_");
			}
			printAnswer();
		} 
		//letter wrong then deduct chance and reprint on screen
		else { 
			chances--;
			printChanceRem ();
		}
		
		//clearing the input for next call
		document.querySelector('#playerEntry').value = ""; 

		//check lose condition
		if (chances == 0) {
			window.alert(`You lose! The answer is ${guessWord}`);
			inputArea.classList.add('hide');
			const printGuessWord = document.createElement ('p');
			printGuessWord.innerHTML = `You lose! The answer is <strong> ${guessWord} </strong>`;
			displayAnswer.appendChild(printGuessWord);
		}

		//check win condition
		if ( answer.includes("_") ) return;
		window.alert('Congratulations!');
		inputArea.classList.add('hide');
	}

//for initial printing on screen


	// if words match then print words on answer array

//5. guessed words are set aside /printed on screen

//6. guess words are wrong then countdown

//7. once countdown hit 0, player loses

//8. once answer array no longer contain _ then player wins

//backend info
