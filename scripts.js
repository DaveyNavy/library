const myLibrary = [];
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author; 
    this.pages = pages;
    this.hasRead = hasRead;

    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.hasRead? "read" : "not read yet");
    }
}

function addBookToLibrary (title, author, pages, hasRead) {
    myLibrary.push(new Book(title, author, pages, hasRead));
}




const containerDiv = document.querySelector(".container");
console.log(containerDiv);

function displayBooks() {

    myLibrary.forEach(element => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-index-number", myLibrary.indexOf(element));

        let title = document.createElement("h1");
        title.innerText = element.title;
        card.appendChild(title);

        let author = document.createElement("h2");
        author.innerText = "By: " + element.author;
        card.appendChild(author);

        let pages = document.createElement("h3");
        pages.innerText = "Pages: " + element.pages;
        card.appendChild(pages);
        
        let hasRead = document.createElement("h3");
        hasRead.innerText = "Has read: " + element.hasRead;
        card.append(hasRead);

        let button = document.createElement("button");
        button.addEventListener("click", () => {
            myLibrary.splice(card.dataset.indexNumber, 1);
            console.log("Here");
            clear();
            displayBooks();
        })

        button.innerText = "Delete";
        card.appendChild(button);

        containerDiv.appendChild(card);
    });
}

function clear() {
    while (containerDiv.firstChild) {
        containerDiv.removeChild(containerDiv.lastChild);
    }
}

addBookToLibrary("The 1", "JRR Tolkien", 295, false);
addBookToLibrary("The 2", "JRR Tolkien", 295, false);

addBookToLibrary("The 3", "JRR Tolkien", 295, false);

addBookToLibrary("The 4", "JRR Tolkien", 295, false);

addBookToLibrary("The 5", "JRR Tolkien", 295, false);

addBookToLibrary("The Hobbit", "JRR Tolkien", 295, false);

addBookToLibrary("The Hobbit", "JRR Tolkien", 295, false);

addBookToLibrary("The Hobbit", "JRR Tolkien", 295, false);


displayBooks();
