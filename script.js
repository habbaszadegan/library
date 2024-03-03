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
    let readStatus;
    if (read.checked) {
        readStatus = 'Yes';
    } else {
        readStatus = 'No';
    }

    return library.push(new Book(addTitle, addAuthor, addPages, readStatus));
}

function displayBook(lib) {
    const bookTitles = [];
    const rows = table.querySelectorAll('tr');
    let newRow = '';

    for (const row of rows) {
        const titleCell = row.querySelector('td:first-child');
        bookTitles.push(titleCell.textContent);
    }
    
    for (const book of lib) {
        if (bookTitles.includes(book.title)) {
            continue;
        }
        newRow = document.createElement('tr');
        newRow.setAttribute('data-index', lib.length - 1);
        for (const property in book) {
            const newCell = document.createElement('td');
            newCell.textContent = book[property];
            newRow.appendChild(newCell);
            createReadButton (book, property, newCell);
        }
        table.appendChild(newRow);
    }
    createDeleteButton(newRow, lib);
}

function createReadButton (bo, prop, cell) {
    if(prop === 'read') {  
        let readBtn = document.createElement('button');
        readBtn.textContent = bo[prop];
        cell.textContent = '';
        cell.appendChild(readBtn);
    }
}

function createDeleteButton (row, libArray) {
    const deleteBook = document.createElement('button');
    deleteBook.textContent = 'Delete';
    row.appendChild(deleteBook);
    deleteBook.addEventListener('click', () => {
        libArray.splice(libArray.length - 1, 1);
        console.log(libArray);
        row.remove();
    })
}

openModal.addEventListener('click', () => dialog.showModal());

submit.addEventListener('click', () => {
    addBookModal();
    displayBook(library);

    console.table(library);
})