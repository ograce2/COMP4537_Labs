
//import * as userMessages from '../lang/messages/en/user.js';


/**
 * The Game class manages the overall game state and logic. It creates the necessary
 * elements for the user to play the game, as well as methods to manage the flow of the
 * game.
 */
class Game{

    /**
     * The minimum number of buttons that can be created for the game.
     */
    static MIN_NUM = 3;

    /**
     * The maximum number of buttons that can be created for the game.
     */
    static MAX_NUM = 7;

    /**
     * Creates a new Game instance. Initializes the buttons array, the input form, and 
     * the nextButton attribute.
     */
    constructor(){
        this.buttons = [];
        //this.goButton = null;
        this.num = 0;

        this.display = new Display();

        this.inputID = "gameInput";


        this.buttonDiv = Display.getButtonDisplayDiv();

        this.inputForm = new InputForm(Game.MIN_NUM, Game.MAX_NUM, "gameInput", "goButton", this.start.bind(this));
        this.display.addElementToDiv(this.inputForm.getForm());

        
        //this.buttonDiv.class = "initButtonDiv";
        document.body.appendChild(this.buttonDiv);
        
        //this.width = 0;
        //this.height = 0;

        this.nextButton = 1;

    }

    resetGame(){
        this.nextButton = 1;
        this.removeButtons();
        this.display.displayMessage(GAME_IN_PROGRESS);
    }

    // Scrambles the buttons on the screen

    /**
     * Scrambles the buttons on the screen to random locations this.num number of times with a delay between
     * each scrabmble.
     */
    scrambleButtons(scramblesLeft){
        console.log("Scrambling buttons...");

        // for (let i = 0; i < this.buttons.length; i++){
        //     console.log("scrambling button " + (i + 1));
        //     this.buttons[i].hideText();
        //     // let left = Display.getRandomWidth() + "px";
        //     // let top = Display.getRandomHeight() + "px";
        //     let height = this.buttons[i].btn.offsetHeight;
        //     let width = this.buttons[i].btn.offsetWidth;
        //     let left = Display.getRandomLocationHorizontal(width) + "px";
        //     let top = Display.getRandomLocationVertical(height) + "px";
        //     console.log("Screen size: " + screen.width + ", " + screen.height);
        //     console.log("New position: " + left + ", " + top);
        //     this.buttons[i].setLocation(left, top);
        // }
    //     if (scramblesLeft > 1){{
    //         this.buttons.forEach(button => function (){
    //         let height = button.btn.offsetHeight;
    //         let width = button.btn.offsetWidth;
    //         let left = Display.getRandomLocationHorizontal(width) + "px";
    //         let top = Display.getRandomLocationVertical(height) + "px";
    //         console.log("Screen size: " + screen.width + ", " + screen.height);
    //         console.log("New position: " + left + ", " + top);
    //         button.setLocation(left, top);
    //     }
    // );
        

    //     }

        // if (scramblesLeft > 1){
        //     console.log("Scrambles left: " + scramblesLeft);
        //     this.buttons.forEach(button => {
        //         let height = button.btn.offsetHeight;
        //         let width = button.btn.offsetWidth; 
        //         let left = Display.getRandomLocationHorizontal(width) + "px";
        //         let top = Display.getRandomLocationVertical(height) + "px";
        //         console.log("Screen size: " + screen.width + ", " + screen.height);
        //         console.log("New position: " + left + ", " + top);
        //         button.setLocation(left, top);
        //     });
        //     setTimeout(this.scrambleButtons.bind(this, scramblesLeft - 1), 2000);
        // } else{
        //     this.hideButtonOrder();
        //     this.enableButtons();

        //     return;
        // }

        console.log("Scrambles left: " + scramblesLeft);
        this.buttons.forEach(button => {
            let height = button.btn.offsetHeight;
            let width = button.btn.offsetWidth; 
            let left = this.display.getRandomLocationHorizontal(width) + "px";
            let top = this.display.getRandomLocationVertical(height) + "px";
            console.log("Screen size: " + screen.width + ", " + screen.height);
            console.log("New position: " + left + ", " + top);
            button.setLocation(left, top);
        });

        if (scramblesLeft > 1){
            setTimeout(this.scrambleButtons.bind(this, scramblesLeft - 1), 2000);
        } else{
            this.hideButtonOrder();
            this.enableButtons();  
            this.inputForm.enableFormSubmission();
            return;
        }
        

        // using width and height, place all buttons randomly on screen
    }

    // getInputValue(){
    //     return this.inputForm.getInputValue();
    // }

    /**
     * Handler attached to a button to check if the user clicked the correct button.
     * If the button that was clicked matches the nextButton attribute, then nextButton is incremented.
     * If the nextButton is greater than the number of buttons, then the user has won the game and a message is 
     * displayed for the user. If the button clicked does not match the nextButton attribute, then the game is 
     * over and the user has lost and an error message is displayed.
     * @param {*} event 
     */
    checkUserGuess(event){
        // TO DO --> still need to display messages to user
        let buttonID = event.srcElement.id;
        let order = buttonID.substring(buttonID.length - 1);
        if (order == this.nextButton && this.nextButton < this.num){
            console.log("Correct! You clicked button " + this.nextButton);
            document.getElementById(buttonID).innerHTML = this.nextButton;
            this.nextButton++;
        } else if (order == this.nextButton && this.nextButton == this.num){
            document.getElementById(buttonID).innerHTML = this.nextButton;
            console.log("You win! You clicked all the buttons in the correct order.");
            this.display.displayMessage(WIN);
            this.revealAnswer();
        } else{
            console.log("Game over! You clicked the wrong button.");
            this.display.displayMessage(LOSE);
            this.revealAnswer();
        }
    }

    /**
     * Removes all buttons from the page and clears the buttons array.
     */
    removeButtons(){

        if (this.buttons.length == 0){
            return;
        }

        for (let i = 0; i < this.buttons.length; i++){
            this.buttonDiv.removeChild(this.buttons[i].btn);
        }

        this.buttons = [];

    }

    /**
     * Creates the number of ScrambleButton instances specified by num, adds them to the buttons array, and
     * displays them on the page in a row. Each button is assigned a random colour and an event listener to check
     * the user's guess when clicked.
     * @param {*} num 
     */
    initializeButtons(){

        for (let i = 0; i < this.num; i++){
            let btn = new ScrambleButton(i + 1, "button" + (i + 1), Display.getRandomColour(), "10em", "5em");
            btn.btn.addEventListener("click", this.checkUserGuess.bind(this));
            this.buttons.push(btn);
            this.buttonDiv.appendChild(btn.btn);
            console.log("Button " + (i + 1) + " created.");
        }

        //document.body.appendChild(this.buttonDiv);

        
    }

    /**
     * Enables all buttons in the buttons array by calling their enableButton method.
     */
    enableButtons(){

        for (let k = 0; k < this.buttons.length; k++){
            this.buttons[k].enableButton();
        }
    }

    /**
     * Hides all the orders on the buttons in the buttons array by calling their hideText method.
     */
    hideButtonOrder(){
        for (let i = 0; i < this.buttons.length; i++){
            this.buttons[i].hideText();
        }
    }

    // Starts a new game
    start(){
        console.log("Game started with " + document.getElementById(this.inputID).value + " buttons.");
        this.resetGame();
        this.num = document.getElementById(this.inputID).value;

        // get rid of buttons from the page
        //this.removeButtons();

        this.initializeButtons();



        // for (let i = 0; i < this.num; i++){
        //     let btn = new ScrambleButton(i + 1, "button" + (i + 1), Display.getRandomColour(), "10em", "5em");
        //     btn.btn.addEventListener("click", this.checkUserGuess.bind(this));
        //     this.buttons.push(btn);
        //     document.body.appendChild(btn.btn);
        //     Display.setButtonLocation(this.num, this.buttons[i]);
        //     console.log("Button " + (i + 1) + " created.");
        // }

        // setTimeout(this.scrambleButtons.bind(this), this.num * 1000); 
        // console.log("SCRAMBLE ONCE");

        // for (let i = 0; i < this.num - 1; i++){
        //     console.log("SCRAMBLE AGAIN");
        //     setTimeout(this.scrambleButtons.bind(this), 2000);

        // }

        this.inputForm.disableFormSubmission();
        setTimeout(this.scrambleButtons.bind(this, this.num), this.num*1000);


        // get input
        // set num
        // create buttons
        // scramble buttons num amount of times
    }

    // beginScramble(){
    //     setInterval(this.scrambleButtons.bind(this), this.num * 1000); 
    //     console.log("PAUSE: 1");
    //     for (let j = 0; j < this.num - 1; j++){
    //         console.log("PAUSE: " + (j + 2));
    //         setInterval(this.scrambleButtons.bind(this), 2000);

    //     }
    //     return;
    // }

    /**
     * Reveals the answers on the buttons after the games is over.
     */
    revealAnswer(){
        // reveal the answers to the buttons
        this.buttons.forEach(button => button.showText());
        this.buttons.forEach(button => button.disableButton());
        this.buttons.forEach(button => button.makeStatic());
    }



}

/**
 * The InputForm class creates a form with a number input, label, and button for
 * the user to input a number between a specified minimum and maximum value.
 */
class InputForm{
    
    /**
     * Creates a new InputForm instance with the specified parameters.
     * @param {*} minNum - the minimum number that can be inputted in the form
     * @param {*} maxNum - the maximum number that can be inputted in the form
     * @param {*} inputId - the id of the input element
     * @param {*} buttonID - the id of the button element
     * @param {*} buttonFunction - the function to be called when the button is clicked
     */
    constructor(minNum, maxNum, inputId, buttonID, buttonFunction){

        this.stepValue = 1;

        this.form = document.createElement("form");
        this.form.id = "inputForm";

        this.input = document.createElement("input");
        this.input.type = "number";
        this.input.min = minNum;
        this.input.max = maxNum;
        this.input.value = minNum;
        this.input.step = this.stepValue;
        this.input.id = inputId;

        this.label = document.createElement("label");
        this.label.for = this.id;
        this.label.innerHTML = "Enter a number between " + minNum + " and " + maxNum + ": ";
        this.btn = new Button("Go", buttonID, "lightblue", "50px", "25px", buttonFunction);

        this.form.appendChild(this.label);
        this.form.appendChild(this.input);
        this.form.appendChild(this.btn.btn);

        this.form.addEventListener("submit", function(event){
            event.preventDefault();
            let num = document.getElementById(inputId).value;
            console.log("Form submitted with value: " + num);
            buttonFunction();
        });
        

        document.body.appendChild(this.form);

    }

    getForm(){
        return this.form;
    }

    disableFormSubmission(){
        this.btn.disableButton();
    }

    enableFormSubmission(){
        this.btn.enableButton();
    }

}

/**
 * The Button class creates a button element with specified text, id, color, width, and height.
 */
class Button{

    /**
     * Creates a new Button instance with the specified parameters.
     * @param {*} text - the text to be displayed on the button
     * @param {*} id - the id of the button element
     * @param {*} colur - the background color of the button
     * @param {*} width - the width of the button
     * @param {*} height - the height of the button
     */
    constructor(text, id, colur, width, height){
        this.btn = document.createElement("button");
        this.btn.innerHTML = text;
        this.btn.id = id;
        this.btn.style.backgroundColor = colur;
        this.btn.style.width = width;
        this.btn.style.height = height;
        //this.btn.style.position = "absolute";
    }

    /**
     * Enables the button by setting its disabled property to false.
     */
    enableButton(){
        this.btn.disabled = false;
    }

    /**
     * Disables the button by setting its disabled property to true.
     */
    disableButton(){
        this.btn.disabled = true;
    }
}

/**
 * The ScrambleButton class extends the Button class to create a button that can be
 * scrambled to random locations on the screen. It also has methods to hide and show
 * its text, as well as get its number and set its location.
 */
class ScrambleButton extends Button{

    /**
     * Creates a new ScrambleButton instance with the specified parameters.
     * @param {*} order - the order number of the button
     * @param {*} id - the id of the button element
     * @param {*} colur - the background color of the button
     * @param {*} width - the width of the button
     * @param {*} height - the height of the button
     */
    constructor(order, id, colur, width, height){
        super(order, id, colur, width, height);
        this.order = order;
        this.btn.disabled = true;
    }

    makeStatic(){
        this.btn.style.position = "static";
    }

    /**
     * Hides the text on the button by setting its innerHTML to an empty string.
     */
    hideText(){
        this.btn.innerHTML = "";
    }

    /**
     * Shows the text on the button by setting its innerHTML to its order number.
     */
    showText(){
        this.btn.innerHTML = this.order;
    }

    /**
     * Gets the order number of the button.
     * @returns the order number of the button
     */
    getNumber(){
        return this.order;
    }

    /**
     * Sets the location of the button by setting its left and top style properties.
     * @param {*} left 
     * @param {*} top 
     */
    setLocation(left, top){
        this.btn.style.position = "absolute";
        this.btn.style.left = left;
        this.btn.style.top = top;
    }
}

/**
 * The Display class contains static methods for displaying elements on the screen, including
 * getting random colours, vertical locations, and horizontal locations, as well as setting button locations.
 */
class Display{

    constructor(){
        this.div = document.createElement("div");
        this.div.id = "displayDiv";
        this.message = document.createElement("p");
        this.message.innerHTML = "Button Game";
        this.message.className = "displayMessage";
        this.div.appendChild(this.message);
        document.body.appendChild(this.div);
    }

    static getButtonDisplayDiv(){
        let buttonDiv = document.createElement("div");
        buttonDiv.className = "buttonDiv";
        return buttonDiv;
    }

    /**
     * Generates a random hex colour string.
     * @returns a random hex colour string
     */
    static getRandomColour(){
        const letters = '0123456789ABCDEF';
        let colour = '#';
        for (let i = 0; i < 6; i++) {
            colour += letters[Math.floor(Math.random() * 16)];
        }
        return colour;
    }

    // // REMOVE LATER
    // static getRandomHeight(){
    //     return Math.floor(Math.random() * (window.innerHeight));
    //     //return Math.floor(Math.random() * (screen.height));
    // }

    // // REMOVE LATER
    // static getRandomWidth(){
    //     return Math.floor(Math.random() * (window.innerWidth));
    //     //return Math.floor(Math.random() * (screen.width));
    // }

    addElementToDiv(element){
        this.div.appendChild(element);
    }

    /**
     * Gets a random vertical location on the screen, taking into account the height of the element
     * to ensure it does not go off the screen.
     * @param {*} height - the height of the element to be placed
     * @returns a random vertical location on the screen
     */
    getRandomLocationVertical(height){
        // return (Math.floor(Math.random() * (window.innerHeight - height)) - this.div.offsetHeight);
        console.log("DIV HEIGHT: " + this.div.offsetHeight);
        return (Math.floor(Math.random() * (window.innerHeight - height - this.div.offsetHeight)) + this.div.offsetHeight);
        //return Math.floor(Math.random() * (screen.height));
    }

    /**
     * Gets a random horizontal location on the screen, taking into account the width of the element
     * to ensure it does not go off the screen.
     * @param {*} width - the width of the element to be placed
     * @returns a random horizontal location on the screen
     */
    getRandomLocationHorizontal(width){
        return Math.floor(Math.random() * (window.innerWidth - width));
        //return Math.floor(Math.random() * (screen.width));
    }

    displayMessage(message){
        this.message.innerHTML = message;
    }

    // // REMOVE LATER
    // static setButtonLocation(totalButtons, button){
    //     let left = (screen.width - 50) / (totalButtons * (button.getNumber()));
    //     let top = 50;
    //     button.setLocation(left + "px", top + "px");

    // }
}

// class GoButton extends Button{
//     constructor(text, id, colur, width, height, onClickFunction){
//         super(text, id, colur, width, height);
//         this.btn.onclick = onClickFunction;
//     }
// }


// TESTING PURPOSES

function testStart(){
    console.log("Go button clicked!");
}
function begin(){
    new Game();
}

begin();