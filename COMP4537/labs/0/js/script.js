// AI was used while creating this assignment.

// Strings used in the program
const BUTTON = "button";
const INPUT = "input";
const FORM = "form";
const DIV = "div";
const SUBMIT = "submit";
const CLICK = "click";
const PX = "px";
const NUMBER = "number";
const SPACING = "spacing";
const LABEL = "label";
const STATIC = "static";
const ABSOLUTE = "absolute";
const HEX_DIGITS = "0123456789ABCDEF";
const SPACE = " ";
const HASHTAG = "#";

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
     * ID used for the input element.
     */
    static INPUT_ID = "gameInput";

    /**
     * ID used for the Go button.
     */
    static GO_BUTTON_ID = "goButton";

    /**
     * Width of scramble buttons.
     */
    static BUTTON_WIDTH = "10em";

    /**
     * Height of scramble buttons.
     */
    static BUTTON_HEIGHT = "5em";

    /**
     * Creates a new Game instance. Initializes the buttons array, the input form, num,
     * nextButton, display, and buttonDiv attributes.
     */
    constructor(){
        this.buttons = [];
        this.num = 0;
        this.nextButton = 1;
        this.display = new Display();
        this.buttonDiv = Display.getButtonDisplayDiv();
        this.inputForm = new InputForm(Game.MIN_NUM, Game.MAX_NUM, Game.INPUT_ID, Game.GO_BUTTON_ID, this.start.bind(this));
        this.display.addElementToDiv(this.inputForm.getForm());
        document.body.appendChild(this.buttonDiv);
    }
 
    /**
     * Resets the game by setting nextButton to 1, num to 0, and removing the existing buttons from the window.
     */
    resetGame(){
        this.nextButton = 1;
        this.num = 0;
        this.removeButtons();
    }

    /**
     * Scrambles the buttons on the screen to random locations num number of times with a 2 second 
     * delay between each scrabmble. Once the buttons have been scrambled, the button orders are hidden
     * and the buttons are enabled.
     */
    scrambleButtons(scramblesLeft){
        this.buttons.forEach(button => {
            let height = button.btn.offsetHeight;
            let width = button.btn.offsetWidth; 
            let left = this.display.getRandomLocationHorizontal(width) + PX;
            let top = this.display.getRandomLocationVertical(height) + PX;
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
    }

    /**
     * Handler attached to a button to check if the user clicked the correct button.
     * If the button that was clicked matches the nextButton attribute, then nextButton is incremented.
     * If the nextButton is greater than the number of buttons, then the user has won the game and a message is 
     * displayed for the user. If the button clicked does not match the nextButton attribute, then the game is 
     * over and the user has lost and an error message is displayed.
     * @param {*} event 
     */
    checkUserGuess(event){
        let buttonID = event.srcElement.id;
        let order = buttonID.substring(buttonID.length - 1);
        if (order == this.nextButton && this.nextButton < this.num){
            document.getElementById(buttonID).innerHTML = this.nextButton;
            this.nextButton++;
        } else if (order == this.nextButton && this.nextButton == this.num){
            document.getElementById(buttonID).innerHTML = this.nextButton;
            Display.displayMessage(WIN);
            this.revealAnswer();
        } else{
            Display.displayMessage(LOSE);
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
            let btn = new ScrambleButton(i + 1, BUTTON + (i + 1), HASHTAG + Display.getRandomHexString(), Game.BUTTON_WIDTH, Game.BUTTON_HEIGHT);
            btn.btn.addEventListener(CLICK, this.checkUserGuess.bind(this));
            this.buttons.push(btn);
            this.buttonDiv.appendChild(btn.btn);
        }
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

    /**
     * Starts a new game by resetting the game, initializing the buttons, and calling the scramble
     * method.
     */
    start(){
        this.resetGame();
        this.num = document.getElementById(Game.INPUT_ID).value;
        this.initializeButtons();
        this.inputForm.disableFormSubmission();
        setTimeout(this.scrambleButtons.bind(this, this.num), this.num*1000);
    }

    /**
     * Reveals the answers on the buttons after the games is over.
     */
    revealAnswer(){
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
     * Color of Go button.
     */
    static GO_BUTTON_COLOUR = "lightblue";

    /**
     * Width of Go button.
     */
    static GO_BUTTON_WIDTH = "5em";

    /**
     * Height of Go button.
     */
    static GO_BUTTON_HEIGHT = "2em";

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

        this.form = document.createElement(FORM);

        this.input = document.createElement(INPUT);
        this.input.type = NUMBER;
        this.input.min = minNum;
        this.input.max = maxNum;
        this.input.value = minNum;
        this.input.step = this.stepValue;
        this.input.id = inputId;
        this.input.className = SPACING;

        this.label = document.createElement(LABEL);
        this.label.for = this.id;
        this.label.innerHTML = GAME_PROMPT;
        this.btn = new Button(GO_BUTTON, buttonID, InputForm.GO_BUTTON_COLOUR, InputForm.GO_BUTTON_WIDTH, 
            InputForm.GO_BUTTON_HEIGHT, buttonFunction);

        this.form.appendChild(this.label);
        this.form.appendChild(this.input);
        this.form.appendChild(this.btn.btn);

        this.form.addEventListener(SUBMIT, function(event){
            event.preventDefault();
            buttonFunction();
        });
        
        document.body.appendChild(this.form);
    }

    /**
     * Returns the form element of the InputForm.
     * @returns the HTML form element of the InputForm
     */
    getForm(){
        return this.form;
    }

    /**
     * Disables the Go button of the form.
     */
    disableFormSubmission(){
        this.btn.disableButton();
    }

    /**
     * Enables the Go button of the form.
     */
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
     * @param {*} colour - the background color of the button
     * @param {*} width - the width of the button
     * @param {*} height - the height of the button
     */
    constructor(text, id, colour, width, height){
        this.btn = document.createElement(BUTTON);
        this.btn.innerHTML = text;
        this.btn.id = id;
        this.btn.style.backgroundColor = colour;
        this.btn.style.width = width;
        this.btn.style.height = height; 
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

    /**
     * Makes the button position static.
     */
    makeStatic(){
        this.btn.style.position = STATIC;
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
     * Sets the location of the button by setting its left and top style properties.
     * @param {*} left 
     * @param {*} top 
     */
    setLocation(left, top){
        this.btn.style.position = ABSOLUTE;
        this.btn.style.left = left;
        this.btn.style.top = top;
    }
}

/**
 * The Display class contains static methods for displaying elements on the screen, including
 * getting random colours, vertical locations, and horizontal locations, as well as setting button locations.
 */
class Display{

    /**
     * Class name for buttonDiv element.
     */
    static BUTTON_DIV_CLASS = "buttonDiv";

    /**
     * Creates a new Display element with a div for displaying items in. The div
     * is appended to the top of the body element.
     */
    constructor(){
        this.div = document.createElement(DIV);
        this.div.className = SPACING;
        document.body.appendChild(this.div);
    }

    /**
     * Creates a div with the buttonDiv class.
     * @returns a div with the buttonDiv class
     */
    static getButtonDisplayDiv(){
        let buttonDiv = document.createElement(DIV);
        buttonDiv.className = Display.BUTTON_DIV_CLASS + SPACE + SPACING;
        return buttonDiv;
    }

    /**
     * Generates a random 6-digit hex string.
     * @returns a random hex string
     */
    static getRandomHexString(){
        let hexString = "";
        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * HEX_DIGITS.length);
            hexString += HEX_DIGITS[index];
        }
        return hexString;
    }

    /**
     * Displays a message in an alert for the user.
     * @param {*} message 
     */
    static displayMessage(message){
        alert(message);
    }

    /**
     * Adds an element to the display div.
     * @param {*} element 
     */
    addElementToDiv(element){
        this.div.appendChild(element);
    }

    /**
     * Gets a random vertical location on the screen, taking into account the height of the element
     * to ensure it does not go off the screen and the height of the display div.
     * @param {*} height - the height of the element to be placed
     * @returns a random vertical location on the screen
     */
    getRandomLocationVertical(height){
        return (Math.floor(Math.random() * (window.innerHeight - height - this.div.offsetHeight)) + this.div.offsetHeight);
    }

    /**
     * Gets a random horizontal location on the screen, taking into account the width of the element
     * to ensure it does not go off the screen.
     * @param {*} width - the width of the element to be placed
     * @returns a random horizontal location on the screen
     */
    getRandomLocationHorizontal(width){
        return Math.floor(Math.random() * (window.innerWidth - width));
    }
}


// Creates a new game
new Game();
