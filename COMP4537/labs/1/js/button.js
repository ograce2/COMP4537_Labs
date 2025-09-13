/**
 * The Button class creates an HTML button with an onclick function.
 */
class Button{

    /**
     * Instantiates the Button element.
     * @param {*} clickFunction - the actions that occur when a button is clicked
     * @param {*} text - the text displayed on the button
     */
    constructor(clickFunction, text){
        this.btn = document.createElement(BUTTON);
        this.btn.innerHTML = text;
        this.btn.onclick = clickFunction;
    }

    /**
     * Returns the HTML button element associated with this Button.
     * @returns the HTML button element
     */
    getButton(){
        return this.btn;
    }

    /**
     * Adds a class to the button.
     * @param {*} newClass 
     */
    addClass(newClass){
        this.btn.className += SPACE + newClass;
    }
}

/**
 * The RemoveButton class is a subclass of the Button class and its purpose is to
 * remove a div from the HTML document and call the NoteManager class to update
 * local storage.
 */
class RemoveButton extends Button{

    /**
     * Instantiates a new RemoveButton element.
     * @param {*} divToRemove - the div to remove from the HTML document
     */
    constructor(divToRemove){
        super(function(){
            divToRemove.remove();
            NoteManager.saveNotes();
        }, REMOVE);
        this.btn.className = REMOVE_BUTTON;
    }

    /**
     * Hides the RemoveButton.
     */
    hideButton(){
        this.btn.style.display = NONE;
    }

    /**
     * Displays the RemoveButton.
     */
    showButton(){
        this.btn.style.display = INLINE_BLOCK;
    }
}


/**
 * The AddButton class is a subclass of the Button class that is used to add
 * a new note to the specified div with a Writer display.
 */
class AddButton extends Button{

    /**
     * Instantiates a new AddButton.
     * @param {*} containerDiv - the div to append the note to
     */
    constructor(containerDiv){
        super(function(){
            let newNote = new Note(EMPTY_STRING);
            containerDiv.appendChild(newNote.getWriterDisplay());
        }, ADD);
        this.btn.className = ADD_BUTTON;
    }
}


/**
 * The PageButton class is a subclass of the Button class. A PageButton loads a new page
 * when it is clicked.
 */
class PageButton extends Button{

    /**
     * Instantiates a new PageButton
     * @param {*} page - the page to load
     * @param {*} text - the text to display on the button
     */
    constructor(page, text){
        super(function(){
            window.location.href = page
        }, text);
        this.btn.className = PAGE_BUTTON;
    }
}