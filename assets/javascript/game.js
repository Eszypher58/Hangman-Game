
	var consoleLine = document.getElementById("console");
	var content = document.getElementById("window");
	var input = "";
	var helpMsg = "~Type hangman to start the GAME~";
	var invalidMsg = "Invalid Input. Type '?' for help message. Please try Again.";
	var inputString = "";
	var isPlaying = false; //true when HangMan is running, false otherwise

	function printToWindow(inputText, message) {

		//create a new p tag
		var evalutedInputLine = document.createElement("p");
		
		//create text that goes into new paragraph
		var evaluatedInputNode = document.createTextNode(">" + inputText);
		
		//insert such text into the prargraph tag
		evalutedInputLine.appendChild(evaluatedInputNode);
			
		//insert this paragraph tag before console element
		document.getElementById("window").insertBefore(evalutedInputLine, document.getElementById("console"));

		//create output p tag
		var outputLine = document.createElement("p");

		//create text that goes into new paragraph
		var outputLineNode = document.createTextNode(message);
				outputLine.appendChild(outputLineNode);

		//insert before the old prompt
		document.getElementById("window").insertBefore(outputLine, document.getElementById("console"));	

	}


	var newHangManGame = new HangMan();

	document.onkeypress = function (e) {

		//if input is "enter" then evauate, else keep on collecting input

		input = e.key.toLowerCase();

		//if HangMan is running, all the input key needs to be passed to HangMan, instead of the "console"
		if (isPlaying === true) {

			newHangManGame.checkInput(input);

		} else {

			if (input !== "enter" && isPlaying === false) {

				//when input is not enter, append inputted text and display
				inputString += input;
				console.log("InputString is: " + inputString);
				consoleLine = document.getElementById("console");
				consoleLine.innerHTML = "&gt;" + inputString + "<span id='cursor'>_<span>";

			} else {

				//when enter is pressed, check if it is a valid command; valid command include ?, which prints a help message or HangMan, which starts HangMan game
				
				console.log("InputString when Enter pressed: " + inputString);


				if (inputString === "?") {

					printToWindow(inputString, helpMsg);

					inputString = "";

					consoleLine.innerHTML = "&gt;" + inputString + "<span id='cursor'>_<span>";

				} else { 

					if (inputString === "hangman") {

						inputString = "";
						isPlaying = true;

						
						newHangManGame.initialize();

					} else {

						printToWindow(inputString, invalidMsg);

						inputString = "";

						consoleLine.innerHTML = "&gt;" + inputString + "<span id='cursor'>_<span>";

					}




				}


			}
		}

	}


	//Define Hangman object
	function HangMan() {

		var wordBank = ["one", "two", "three"];
		var numberGuessLeft = wordBank.length * 2;
		var letterGuessed = [];
		var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
		var win = 0;
		var loss = 0;
		var selectedWord = "";
		var theWord = null;

		

		//clear the window to start hangman
		this.initialize = function() {

			//clear page
			content.innerHTML = "";

			//reinitialize variables
			numberGuessLeft = wordBank.length * 2;
			letterGuessed = [];

			//create the displys; pick words has to come before createBlank();
			createTitle();
			createMain();
			createInstructions();
			createButtons();
			createBottom();
			createBottomContent();
			pickWord();
			createBlank();
			createPrompt();
 
		}

/*Start of Game Display*/

		//create Title
		var createTitle = function() {

			//setup the pieces of Bootstrap structure
			var newRow = document.createElement("div");
			newRow.className = "row";
			var newCol = document.createElement("div");
			newCol.className = "col-md-12";
			newCol.id = "title";
			var newh1 = document.createElement("h1");
			newh1.className = "text-center";
			//newh1.id = "title";
			var text = document.createTextNode("Console Hangman")
			newh1.appendChild(text);

			//put pieces into array for looping
			var titleStruct = [newRow, newCol, newh1];

			//create temporary pointer to the parent node
			var tempPtr = content;

			//loop through to create array
			for (i = 0; i < titleStruct.length; i++) {

				tempPtr.appendChild(titleStruct[i]);
				tempPtr = tempPtr.lastChild;

			}


		}

		//create main section, code sould be refactored

		var createMain = function() {

			//setup pieces of Bootstrap structure
			var newRow1 = document.createElement("div");
			newRow1.className = "row";
			var newRow2 = document.createElement("div");
			newRow2.className = "row";
			var newCol1 = document.createElement("div");
			newCol1.className = "col-md-8 text-center";
			newCol1.id = "displayPanel";
			var newCol2 = document.createElement("div");
			newCol2.className = "col-md-4 text-center";
			newCol2.id = "infoPanel";
			var newCol3 = document.createElement("div");
			newCol3.className = "col-md-12 text-center";
			newCol3.id = "bottomPanel"

			var tempPtr = document.getElementById("mainwindow");

			tempPtr.appendChild(newRow1);
			tempPtr = tempPtr.lastChild;
			tempPtr.appendChild(newCol1);
			tempPtr.appendChild(newCol2);

			tempPtr = document.getElementById("mainwindow");
			tempPtr.appendChild(newRow2);
			tempPtr = tempPtr.lastChild;
			tempPtr.appendChild(newCol3);

		}

		//create instructions for the main sections
		var createInstructions = function() {

			var tempPtr = document.getElementById("infoPanel");
			tempPtr.innerHTML="<div class='section' id='infoPanelSection'><h2>Instruction</h2><p>Use the alphabet below to guess the word.</p></div>";

			var tempPtr = document.getElementById("displayPanel");
			tempPtr.innerHTML="<div class='section'><h2>The Word</h2><p id='blankWord'></p><div id='drawingBoard'></div></div>";

		}

		//creates the underscrolls coressponding to number of letters in the word picked by computr
		var createBlank = function() {

			var blanks = document.getElementById("blankWord");
			var letter = "";

			for (i = 0; i < selectedWord.length; i++){

				letter += "_ "

			}

			blanks.innerHTML = letter;

		}


		//creates the buttons inside the info panel
		var createButtons = function() {

			var newDiv = document.createElement("div");
			newDiv.id = "keypadSection"
			var tempPtr = document.getElementById("infoPanelSection");
			tempPtr.appendChild(newDiv);
			tempPtr = tempPtr.lastChild;

			var counter = 0;

			for (row = 0; row < 7; row++) {
				
				var newRow = document.createElement("div");
				newRow.className = "row";


				for (col = 0; col < 4; col++) {

					if (counter >= 26) {

					} 

					else {
						
						var newCol = document.createElement("div");
						newCol.className = "col-md-3";
						newCol.innerHTML = "<div><p class='keypad text-center' id='" + letters[counter] + "'>" + letters[counter] + "</p></div>"	
						newRow.appendChild(newCol);

						counter++;

					}

				}

				tempPtr.appendChild(newRow);

			}




		}

		//create the structure of bottom secion, which consists of win/loss/number of guess left
		var createBottom = function() {

			var bottomPanel = document.getElementById("bottomPanel");
			var newRow = document.createElement("div");
			newRow.className = "row";
			var newCol1 = document.createElement("div");
			newCol1.className = "col-md-4";
			newCol1.innerHTML = "<div id='win'></div>"
			var newCol2 = document.createElement("div");
			newCol2.className = "col-md-4";
			newCol2.innerHTML = "<div id='guess'></div>"
			var newCol3 = document.createElement("div");
			newCol3.className = "col-md-4";
			newCol3.innerHTML = "<div id='loss'></div>"

			newRow.appendChild(newCol1);
			newRow.appendChild(newCol2);
			newRow.appendChild(newCol3);

			bottomPanel.appendChild(newRow);


		}

		//create the initial content of the Bottom section
		var createBottomContent = function() {

			var contentWin = document.getElementById("win");
			contentWin.innerHTML = "<h3>Number of Win</h3><p id='winCounter'>" + win + "</p>";
			var contentGuess = document.getElementById("guess");
			contentGuess.innerHTML = "<h3>Number of Guess Left</h3><p id='guessCounter'>" + numberGuessLeft + "</p>";
			var contentLoss = document.getElementById("loss");
			contentLoss.innerHTML = "<h3>Number of Loss</h3><p id='lossCounter'>" + loss + "</p>";

		}


/*Start of Game Logic */

		//this function will randomly pick a word from wordBank and create an array, whose length correspond to the length of the selected word and are filled with all 0
		var pickWord = function() {

			//pick a word from wordbank
			var rng = Math.floor(Math.random() * wordBank.length);
			//console.log("rng is: " + rng);
			selectedWord = wordBank[rng];
			console.log(selectedWord); 

			//create a new array of length selected word
			theWord = new Array(selectedWord.length);

			//fill it with all 0, hich represent not guessed state
			theWord.fill(0);

		}

		//main logi of the game. takes key pressed as input, if it has been selected, dont do anything. otherwise, perform the neccesary logic of the game.
		this.checkInput = function(input) {

			console.log("input passed to HangMan Object: " + input);

			//check if letter has already been selected, if yes, do nothing
			if (hasBeenSelected(input)) {

				console.log("should not execute the first time a ltter is pressed.");

			} else {

				console.log("i should execute");
				//check if letter selected is in the word.
				if (isInWord(input)) {

					//change button color to green
					changeButtonColor(input, "#00FF00");

					//update displayed word
					updateWord(input);

					//check if the game ended...
					if (checkEnd()) {

						//alert("You Won");
						
						//update the win display
						updateWin();

						//show a prompt telling user if win or loss, 1 = win; 0 = loss
						gameEndPrompt(1);

						//wait 1 second before restart
						wait(1000);
						//restart();

					}


				} else {

					//change button color to red
					changeButtonColor(input, "#FF0000");

					//update hangman picture

					//decrease number of guess left by 1, if user smash keys too quickly, guessnumberleft could go to negative. Therefore, stop it at 0.
					if(numberGuessLeft <= 0) {

						numberGuessLeft = 0;

					} else {
					
						numberGuessLeft--;
					
					}

					//update number of guess left and its display
					var contentGuess = document.getElementById("guess");
					contentGuess.innerHTML = "<h3>Number of Guess Left</h3><p id='guessCounter'>" + numberGuessLeft + "</p>";

					//check if user lost...
					if (numberGuessLeft === 0) {

						//update loss counter and display
						updateLoss();

						//show prompt telling user if win or loss, 0 = loss
						gameEndPrompt(0);
						//alert("You lost");
						//wait 1 second befre restart
						wait(1000);


					}


				}

			}

		}

		//change the button color corresponding to the input letter, this function could throw an error if user press non-letter key. the if tatement checks for that.
		var changeButtonColor = function(letter, color) {

			var button = document.getElementById(letter);

			if (button !== null) {

				button.style.backgroundColor = color;

			}

			

		}

		//returns true if letter has been selected, false otherwise
		var hasBeenSelected = function(letter) {

			if (letterGuessed.indexOf(letter) === -1) {

				letterGuessed.push(input);

				return false;

			} else {

				return true;

			}

		}

		//takes letter as input and checks of the letter is in the selectedWord. returns true if letter is in selectedWord. false otherwise.
		var isInWord = function(letter) {

			console.log("selectedWord is: " + selectedWord);

			if (selectedWord.indexOf(letter) === -1) {

				return false;

			} else {

				return true;

			}

		}

		//update the word displayed
		var updateWord = function(letter) {

			var blanks = document.getElementById("blankWord");
			var word = "";

			//genereate an array that represent the state of the guess, array element of letter means correctly guessed. Array element of 0 means not guessed yet.
			for (i = 0; i < selectedWord.length; i++) {

				if (selectedWord.charAt(i) === letter) {

					theWord[i] = letter;

				} else {

					//do nothing.

				}

			}

			console.log("the Word is: " + theWord);


			//from the array state, update word accordingly. Display "_ " for unguessed letters
			for (i = 0; i < theWord.length; i++) {

				console.log(theWord[i]);

				if (theWord[i] === 0) {

					word += "_ ";

				} else {

					word += theWord[i];

				}

			}

			blanks.innerHTML = word;

		}

		//update wincounter and display it
		var updateWin = function() {

			var numberWon = document.getElementById("winCounter");
			win++;
			numberWon.innerHTML = win;

		}

		//update losscounter and display it
		var updateLoss = function() {

			var numberLoss = document.getElementById("lossCounter");
			loss++;
			numberLoss.innerHTML = loss;

		}

		//reset number of guesses left and display it
		var resetGuessLeft = function() {

			var numGuessLeft = document.getElementById("guessCounter");
			numberGuessLeft = wordBank.length *2;
			numGuessLeft.innerHTML = numberGuessLeft;

		}

		//check if the game has ended
		var checkEnd = function() {

			if (theWord.indexOf(0) === -1) {

				return true;

			} else {

				return false;

			}

		}

		//restart the game by initializing variables to initial state
		var restart = function() {

			resetGuessLeft();
			pickWord();
			createBlank();
			resetPrompt();

			for (var i = 0; i < letters.length; i++) {

				changeButtonColor(letters[i], "#FFFFFF");

			}

			numberGuessLeft = wordBank.length * 2;
			letterGuessed = [];
 			
		}

		//create structure of hte prompt
		var createPrompt = function() {

			var newDiv = document.createElement("div");
			newDiv.id = "prompt";
			var newh1 = document.createElement("h1");
			newh1.id = "winloss"
			newDiv.appendChild(newh1);
			var newP1 = document.createElement("p");
			newP1.id = "continue";
			newDiv.appendChild(newP1);
			var newP2 = document.createElement("p");
			newP2.id = "end";
			newDiv.appendChild(newP2);
			//newP.appendChild("To Exit, press E");
			//newDiv.appendChild(newP);
			document.getElementById("mainwindow").appendChild(newDiv);
		}

		//reset prompt to display nothing
		var resetPrompt = function() {

			document.getElementById("winloss").innerHTML = "";
			document.getElementById("continue").innerHTML = "";


		}

		//show the corresponding win/loss prompt text
		var gameEndPrompt = function(e) {

			

			if (e === 1) {

				document.getElementById("winloss").innerHTML = "You WON";

			}

			if (e === 0) {

				document.getElementById("winloss").innerHTML = "You LOST";

			}

			
			document.getElementById("continue").innerHTML = "1000 miliseconds till restart...";
			
			//document.getElementById("end").innerHTML = "To End, press E"
			

		}

		//wait 1000 second before calling restar() to restart game
		var wait = function (ms) {

			setTimeout(function(){

				restart();


			}, ms);

		}


	}