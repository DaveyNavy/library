const myLibrary = [];
function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function () {
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      (this.hasRead ? "read" : "not read yet")
    );
  };
}

function addBookToLibrary(title, author, pages, hasRead) {
  myLibrary.push(new Book(title, author, pages, hasRead));
}

Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

const containerDiv = document.querySelector(".container");

function displayBooks() {
  clear();
  myLibrary.forEach((element) => {
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
      clear();
      displayBooks();
    });

    button.innerText = "Delete";
    card.appendChild(button);

    let toggle = document.createElement("button");
    toggle.addEventListener("click", () => {
      myLibrary[card.dataset.indexNumber].toggleRead();
      clear();
      displayBooks();
    });

    toggle.innerText = "Toggle Read";
    card.appendChild(toggle);
    toggle.setAttribute("style", "margin-left: 5px;");
    containerDiv.appendChild(card);
  });
}

function clear() {
  while (containerDiv.firstChild) {
    containerDiv.removeChild(containerDiv.lastChild);
  }
}

const button = document.querySelector(".add-book");
const dialog = document.querySelector("dialog");
button.addEventListener("click", () => {
  dialog.showModal();
});

// Form validation
const pages = document.querySelector("#pages");
pages.addEventListener("input", (e) => {
  if (pages.validity.valueMissing) {
    console.log("Invalid");
    pages.setCustomValidity("Please provide a page number!");
  } else if (pages.validity.rangeUnderflow) {
    pages.setCustomValidity("Page number must be at least 1!");
  } else {
    pages.setCustomValidity("");
  }
});

const submit = document.querySelector("form");
submit.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);
  addBookToLibrary(
    formProps["title"],
    formProps["author"],
    formProps["pages"],
    formProps["hasRead"] == undefined ? false : true
  );
  displayBooks();
  dialog.close();
});

const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", () => {
  dialog.close();
});

addBookToLibrary("The 1", "JRR Tolkien", 295, false);
addBookToLibrary("The 2", "JRR Tolkien", 295, false);

addBookToLibrary("The 3", "JRR Tolkien", 295, false);

addBookToLibrary("The 4", "JRR Tolkien", 295, false);

displayBooks();
