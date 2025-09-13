/**
 * Creates the display for the index page.
 */
class IndexDisplay{

    /**
     * Instantiates a new IndexDisplay.
     */
    constructor(){
        this.heading = document.createElement(H1);
        this.heading.innerHTML = TITLE;
        this.author = document.createElement(H2);
        this.author.innerHTML = AUTHOR;

        document.body.appendChild(this.heading);
        document.body.appendChild(this.author);

        this.readerButton = new PageButton(READER_PAGE, READER_TITLE);
        document.body.appendChild(this.readerButton.btn);

        this.writerButton = new PageButton(WRITER_PAGE, WRITER_TITLE);
        document.body.appendChild(this.writerButton.btn);
        
    }
}


new IndexDisplay();