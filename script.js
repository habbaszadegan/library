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

function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = index;
    // this.info = () => {
    //     return `${title} by ${author}, ${pages}, ${read}`;
    // }
}

function addBookModal() {
    for(book of library) {
        if(book.title === title.value) {
            return;
        }
    }
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
        for (const property in book) {
            const newCell = document.createElement('td');
            newCell.textContent = book[property];
            newRow.appendChild(newCell);
            createReadButton (book, property, newCell);
        }
        table.appendChild(newRow);
        createDeleteButton(newRow, lib);
    }
}

function createReadButton (bo, prop, cell) {
    if(prop === 'read') {  
        let readBtn = document.createElement('button');
        readBtn.textContent = bo[prop];
        cell.textContent = '';
        cell.appendChild(readBtn);
        readBtn.addEventListener('click', () => {
            if (readBtn.textContent === 'Yes') {
                readBtn.textContent = 'No';
            } else {
                readBtn.textContent = 'Yes';
            }
        })
    }
}

function createDeleteButton (row, libArray) {
    const deleteBook = document.createElement('button');
    deleteBook.textContent = 'Delete';
    row.appendChild(deleteBook);
    const titleToDelete = row.querySelector('td').textContent;
    deleteBook.addEventListener('click', () => {
        for (let i = 0; i < libArray.length; i++) {
            if (libArray[i].title === titleToDelete) {
                libArray.splice(i, 1);
            }
        }
        console.table(libArray);
        row.remove();
    })
}

openModal.addEventListener('click', () => dialog.showModal());

submit.addEventListener('click', () => {
    addBookModal();
    displayBook(library);

    console.table(library);
})