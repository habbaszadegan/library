const addBookBtn = document.querySelector('.add-book');
const table = document.querySelector('table');

const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = () => {
    //     return `${title} by ${author}, ${pages}, ${read}`;
    // }
}

function addBook() {
    const addTitle = prompt('What is the title of the book?');
    const addAuthor = prompt('Who is the author of the book?');
    const addPages = prompt('How many pages does the book have?');
    const readStatus = prompt('Have you read the book?');

    return library.push(new Book(addTitle, addAuthor, addPages, readStatus));
}

function displayBook(lib) {
    const bookTitles = [];
    const rows = table.querySelectorAll('tr');

    for (const row of rows) {
        // Assuming the title is stored in the first cell (td) of each row
        const titleCell = row.querySelector('td:first-child');
        bookTitles.push(titleCell.textContent);
    }
    
    for (const book of lib) {
        if (bookTitles.includes(book.title)) {
            continue;
        }
        const newRow = document.createElement('tr');
        for (const property in book) {
            const newCell = document.createElement('td');
            newCell.textContent = book[property];
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
    }
}

addBookBtn.addEventListener ('click', () => {
    addBook();
    displayBook(library);

    console.table(library);
})