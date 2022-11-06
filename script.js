function Book(cover, title, author, read, index) {
  this.cover = cover;
  this.title = title;
  this.author = author;
  this.read = read;
  this.index = index;
}

const book1 = new Book(
  "https://teachyourselfcs.com/csapp.jpg",
  "Computer Systems: A Programmer's Perspective",
  "Randal Bryant",
  "not read",
  null
  )

let books = [
  {
    cover: "https://teachyourselfcs.com/csapp.jpg",
    title: "Computer Systems: A Programmer's Perspective",
    author: "Randal Bryant",
    read: "not read",
    index: 0,
  },
  {
    cover: "https://teachyourselfcs.com/ostep.jpeg",
    title: "Operating Systems: Three Easy Pieces",
    author: "Remzi Arpaci-Dusseau, Andrea Arpaci-Dusseau",
    read: "not read",
    index: 1,
  },
  {
    cover: "https://teachyourselfcs.com/top-down.jpg",
    title: "Computer Networking: a Top Down Approach",
    author: "Jim Kurose",
    read: "not read",
    index: 2,
  },
  {
    cover: "https://teachyourselfcs.com/redbook.jpg",
    title: "Readings in Database Systems",
    author: "Joseph M. Hellerstein, Michael Stonebraker",
    read: "not read",
    index: 3,
  },
  {
    cover: "https://teachyourselfcs.com/data-reality.jpg",
    title: "Data and Reality",
    author: "William Kent",
    read: "not read",
    index: 4,
  },
]

if ("library" in localStorage) {
  books = JSON.parse(localStorage.getItem("library"));
}

const bookShelf = document.getElementById("book-shelf");

function updateBookShelf() {
  updateBookIndexes();
  bookShelf.innerHTML = '';
  books.forEach(book => {
    bookShelf.appendChild(renderBook(book.cover, book.title, book.author,
      book.read, book.index));
  });
  updateBookIndexes();
  updateReadButtonColor();
  localStorage.setItem("library", JSON.stringify(books));
}

function updateBookIndexes() {
  let i = 0;
  books.forEach(book => {
    book.index = i;
    i += 1;
  });
}

function updateReadButtonColor() {
  const readButtons = document.getElementsByClassName("read-button")
  Array.from(readButtons).forEach((button) => {
    if (button.innerHTML === "✓read") {
      button.style.backgroundColor = "#67b45c";
      button.style.borderColor = "#67b45c";
      button.style.color =  "#30333b";
    } else if (button.innerHTML === "not read") {
      button.style.backgroundColor = "none";
      button.style.borderColor = "#767c86";
      button.style.color =  "#767c86";
    }
  });
}

function renderBook(cover, title, author, read, index) {
  const book = document.createElement("div");
  book.classList.add("book");

  const image = document.createElement("img");
  image.setAttribute("src", cover);
  book.appendChild(image);

  const bookTitle = document.createElement("h3");
  bookTitle.innerHTML = title;
  book.appendChild(bookTitle);

  const authorsName = document.createElement("h6");
  authorsName.innerHTML = author;
  book.appendChild(authorsName);

  const buttons = document.createElement("div");
  buttons.classList.add("book-buttons");
  book.appendChild(buttons);

  const readButton = document.createElement("button");
  readButton.innerHTML = read;
  readButton.classList.add("read-button");
  buttons.appendChild(readButton);

  const removeButton = document.createElement("button");
  removeButton.innerHTML = "x";
  buttons.appendChild(removeButton);

  removeButton.addEventListener("click", () => {
    if (confirm("Remove this book from your library?")) {
      books.splice(index, 1);
      updateBookShelf();
    } else {
      return;
    }
  });

  readButton.addEventListener("click", () => {
    if (books[index].read === "not read") {
      books[index].read = "✓read";
    } else if (books[index].read === "✓read") {
      books[index].read = "not read";
    }
    updateBookShelf();
  });

  return book;
}

const addBookMenu = document.getElementById("add-book-form");
document.getElementById("add-button").addEventListener('click', ()=>{
  const style = getComputedStyle(addBookMenu);
  const display = style.display;
  if (display === 'none') {
    addBookMenu.style.display = 'flex';
  } else {
    addBookMenu.style.display = 'none';
  }
});

updateBookShelf();
