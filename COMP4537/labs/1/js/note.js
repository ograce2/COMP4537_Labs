/**
 * The NoteManager class is responsible for saving notes to local storage
 * and retrieving notes from local storage.
 */
class NoteManager{

    /**
     * Retrieves the notes stored in local storage.
     * @returns an array of Note objects
     */
    static retrieveNotes(){
        let notes = localStorage.getItem(NOTES);
        if (notes != null){
            notes = JSON.parse(notes);
            notes = notes.map(note => new Note(note));
            return notes;
        }
        return [];
    }

    /**
     * Saves the notes on the page to local storage.
     */
    static saveNotes(){
        let inputs = Array.from(document.body.getElementsByClassName(NOTE_TEXT));
        let texts = inputs.map(
            input => input.value
        );
        localStorage.setItem(NOTES, JSON.stringify(texts));

        let now = new Date(Date.now());
        document.getElementById(LAST_STORED).innerHTML = STORED_AT + now.toLocaleTimeString();
    }

}

/**
 * The Note class represents a note and contains elements for displaying that note.
 */
class Note{

    /**
     * Instantiates a new Note object.
     * @param {*} text - the note text
     */
    constructor(text){
        this.noteContainer = document.createElement(DIV);
        this.noteContainer.className = NOTE_CONTAINER;
        this.removeButton = new RemoveButton(this.noteContainer);
        this.textDisplay = document.createElement(TEXT_AREA);
        this.textDisplay.value = text;
        this.textDisplay.className = NOTE_TEXT;

        this.noteContainer.append(this.textDisplay);
        this.noteContainer.append(this.removeButton.getButton());
    }

    /**
     * Returns a div displaying the note for writer.html
     * @returns a div that displays the note for writer.html
     */
    getWriterDisplay(){
        this.textDisplay.disabled = false;
        this.removeButton.showButton();
        return this.noteContainer;
    }

    /**
     * Returns a div displaying the note for reader.html
     * @returns a div that displays the note for reader.html
     */
    getReaderDisplay(){
        this.textDisplay.disabled = true;
        this.removeButton.hideButton();
        return this.noteContainer;
    }

}