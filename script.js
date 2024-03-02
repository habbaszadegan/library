const addBookBtn = document.querySelector('.add-book');
const table = document.querySelector('table');
const dialog = document.querySelector('dialog');
const openModal = document.querySelector('.open-modal');
const submit = document.querySelector('.submit');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');

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

function addBookModal() {
    const addTitle = title.value;
    const addAuthor = author.value;
    const addPages = pages.value;
    const readStatus = read.value;

    return library.push(new Book(addTitle, addAuthor, addPages, readStatus));
}

function displayBook(lib) {
    const bookTitles = [];
    const rows = table.querySelectorAll('tr');
    let newRow = '';

    for (const row of rows) {
        // Assuming the title is stored in the first cell (td) of each row
        const titleCell = row.querySelector('td:first-child');
        bookTitles.push(titleCell.textContent);
    }
    
    for (const book of lib) {
        if (bookTitles.includes(book.title)) {
            continue;
        }
         newRow = document.createElement('tr');
        for (const property in book) {
            const newCell = document.createElement('td');
            newCell.textContent = book[property];
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
    }
    const deleteBook = document.createElement('button');
    deleteBook.textContent = 'Delete';
    newRow.appendChild(deleteBook);
    deleteBook.addEventListener('click', () => {
        
    })

}

openModal.addEventListener('click', () => dialog.showModal());

submit.addEventListener('click', () => {
    addBookModal();
    displayBook(library);

    console.table(library);
})

// Add a button on each book’s display to remove the book from the library.
// You will need to associate your DOM elements with the actual book objects in some way. 
// One easy solution is giving them a data-attribute that corresponds to the index of the library array.

// function addBook() {
//     const addTitle = prompt('What is the title of the book?');
//     const addAuthor = prompt('Who is the author of the book?');
//     const addPages = prompt('How many pages does the book have?');
//     const readStatus = prompt('Have you read the book?');

//     return library.push(new Book(addTitle, addAuthor, addPages, readStatus));
// }



// addBookBtn.addEventListener ('click', () => {
//     addBook();
//     displayBook(library);

//     console.table(library);
// })