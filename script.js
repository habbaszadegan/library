const myLibrary = [];

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary() {
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');
        const pagesInput = document.getElementById('pages');
        const readInput = document.getElementById('read');
        
        if (readInput.value == 'on') {
            readInput.value = 'Yes';
        } else {
            readInput.value = 'No';
        }
    
        let newBookEntry = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value);

        for (book of myLibrary) {
            if (book.title == newBookEntry.title) {
                return;
            }
        }

        myLibrary.push(newBookEntry);
        displayLibrary(newBookEntry);
    })
}

function displayLibrary(newBook) {
    let filteredLibrary = myLibrary.filter((book) => book.title == newBook.title);
    filteredLibrary.forEach((book, i) => {
        let newEntry = document.createElement('div');

        if (book.index === undefined) {
            book.index = i;
        }

        newEntry.setAttribute('data-book-index', book.index);
        newEntry.textContent = `${book.title} ${book.author} ${book.pages} ${book.read}`;
        document.body.appendChild(newEntry);
        removeBook(newEntry);
    })
}

function runModal() {
    let newBookBtn = document.querySelector('.new-book');
    let dialog = document.querySelector('.dialog');
    let submit = document.querySelector('.submit');
    newBookBtn.addEventListener('click', () => dialog.showModal());
    submit.addEventListener('click', () => dialog.close());
}

function removeBook(nwbk) {
    let removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', () => {
        nwbk.remove();
        removeBtn.remove();
    })
    document.body.appendChild(removeBtn);
}

addBookToLibrary();
runModal();

// 1st attempt

// const addBookBtn = document.querySelector('.add-book');
// const table = document.querySelector('table');
// const dialog = document.querySelector('dialog');
// const openModal = document.querySelector('.open-modal');
// const submit = document.querySelector('.submit');
// const title = document.querySelector('#title');
// const author = document.querySelector('#author');
// const pages = document.querySelector('#pages');
// const read = document.querySelector('#read');

// const library = [];

// function Book(title, author, pages, read, index) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.index = index;
//     // this.info = () => {
//     //     return `${title} by ${author}, ${pages}, ${read}`;
//     // }
// }

// function addBookModal() {
//     for(book of library) {
//         if(book.title === title.value) {
//             return;
//         }
//     }
//     const addTitle = title.value;
//     const addAuthor = author.value;
//     const addPages = pages.value;
//     let readStatus;
//     if (read.checked) {
//         readStatus = 'Yes';
//     } else {
//         readStatus = 'No';
//     }
//     return library.push(new Book(addTitle, addAuthor, addPages, readStatus));
// }

// function displayBook(lib) {
//     const bookTitles = [];
//     const rows = table.querySelectorAll('tr');
//     let newRow = '';

//     for (const row of rows) {
//         const titleCell = row.querySelector('td:first-child');
//         bookTitles.push(titleCell.textContent);
//     }
    
//     for (const book of lib) {
//         if (bookTitles.includes(book.title)) {
//             continue;
//         }
//         newRow = document.createElement('tr');
//         for (const property in book) {
//             const newCell = document.createElement('td');
//             newCell.textContent = book[property];
//             newRow.appendChild(newCell);
//             createReadButton (book, property, newCell);
//         }
//         table.appendChild(newRow);
//         createDeleteButton(newRow, lib);
//     }
// }

// function createReadButton (bo, prop, cell) {
//     if(prop === 'read') {  
//         let readBtn = document.createElement('button');
//         readBtn.textContent = bo[prop];
//         cell.textContent = '';
//         cell.appendChild(readBtn);
//         readBtn.addEventListener('click', () => {
//             if (readBtn.textContent === 'Yes') {
//                 readBtn.textContent = 'No';
//             } else {
//                 readBtn.textContent = 'Yes';
//             }
//         })
//     }
// }

// function createDeleteButton (row, libArray) {
//     const deleteBook = document.createElement('button');
//     deleteBook.textContent = 'Delete';
//     row.appendChild(deleteBook);
//     const titleToDelete = row.querySelector('td').textContent;
//     deleteBook.addEventListener('click', () => {
//         // const filteredLibrary = libArray.filter((book, index) => index !== row);
//         for (let i = 0; i < libArray.length; i++) {
//             if (libArray[i].title === titleToDelete) {
//                 libArray.splice(i, 1);
//             }
//         }
//         console.table(libArray);
//         row.remove();
//     })
// }

// openModal.addEventListener('click', () => dialog.showModal());

// submit.addEventListener('click', () => {
//     addBookModal();
//     displayBook(library);

//     console.table(library);
// })