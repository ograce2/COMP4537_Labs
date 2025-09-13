/**
 * The WriterDisplay class creates the display for the Writer.html page.
 */
class WriterDisplay{

    /**
     * Instantiates a new WriterDisplay object.
     */
    constructor(){

        this.lastStored = document.createElement(DIV);
        let now = new Date(Date.now());
        this.lastStored.innerHTML = STORED_AT + now.toLocaleTimeString();
        this.lastStored.id = LAST_STORED;
        this.lastStored.className = UPDATE_LABEL;
        document.body.appendChild(this.lastStored);

        this.title = document.createElement(H1);
        this.title.innerHTML = WRITER_TITLE;
        document.body.appendChild(this.title);

        this.noteDisplay = document.createElement(DIV);
        this.noteDisplay.className = NOTE_DISPLAY;
        document.body.appendChild(this.noteDisplay);

        this.addButton = new AddButton(this.noteDisplay);
        
        this.backButton = new PageButton(INDEX_PAGE, BACK);
        this.backButton.addClass(BOTTOM_LEFT);

        document.body.appendChild(this.addButton.getButton());
        document.body.appendChild(this.backButton.getButton());

        this.retrieveNotes();

        setInterval(NoteManager.saveNotes, UPDATE_TIME);

    }

    /**
     * Displays the notes on the writer page.
     * @param {*} notes - the notes to display
     */
    displayNotes(notes){
        this.noteDisplay.innerHTML = "";
        notes.forEach(note => this.noteDisplay.appendChild(note.getWriterDisplay()));
    }

    /**
     * Retrieves the notes from local storage and displays them.
     */
    retrieveNotes(){
        this.displayNotes(NoteManager.retrieveNotes());
    }
}


new WriterDisplay();

