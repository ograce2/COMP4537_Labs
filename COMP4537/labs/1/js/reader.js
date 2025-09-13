/**
 * Creates the display for the Reader page.
 */
class ReaderDisplay{

    /**
     * Instantiates a new ReaderDisplay with the notes from local storage and 
     * begins retrieving notes form local storage.
     */
    constructor(){
        this.lastUpdated = document.createElement(DIV);
        let now = new Date(Date.now());
        this.lastUpdated.innerHTML = UPDATED_AT + now.toLocaleTimeString();
        this.lastUpdated.id = LAST_UPDATED;
        this.lastUpdated.className = UPDATE_LABEL;
        document.body.appendChild(this.lastUpdated);

        this.title = document.createElement(H1);
        this.title.innerHTML = READER_TITLE;
        document.body.appendChild(this.title);

        this.noteDisplay = document.createElement(DIV);
        this.noteDisplay.className = NOTE_DISPLAY;
        document.body.appendChild(this.noteDisplay);

        this.backButton = new PageButton(INDEX_PAGE, BACK);
        this.backButton.addClass(BOTTOM_LEFT);
        document.body.appendChild(this.backButton.getButton());


        this.retrieveNotes();
        setInterval(this.retrieveNotes.bind(this), UPDATE_TIME);
    }

    /**
     * Displays notes from local storage.
     * @param {*} notes - the notes to display
     */
    displayNotes(notes){
        this.noteDisplay.innerHTML = EMPTY_STRING;
        notes.forEach(note => this.noteDisplay.appendChild(note.getReaderDisplay()));
    }

    /**
     * Retrieves the notes from local storage and updates the lastUpdated text.
     */
    retrieveNotes(){
        this.displayNotes(NoteManager.retrieveNotes());
        let now = new Date(Date.now());
        this.lastUpdated.innerHTML = UPDATED_AT + now.toLocaleTimeString();
    }
}


new ReaderDisplay();