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
  {
    cover: "https://teachyourselfcs.com/skiena.jpg",
    title: " The Algorithm Design Manual",
    author: "Steven Skiena",
    read: "not read",
    index: 5,
  },
  {
    cover: "https://teachyourselfcs.com/polya.jpg",
    title: "How to Solve It",
    author: "George Pólya",
    read: "not read",
    index: 6,
  },
  {
    cover: "https://teachyourselfcs.com/dragon.jpg",
    title: "Compilers: Principles, Techniques & Tools",
    author: "Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman",
    read: "not read",
    index: 7,
  },
  {
    cover: "https://teachyourselfcs.com/ddia.jpg",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    read: "not read",
    index: 8,
  },
  {
    cover: "https://teachyourselfcs.com/sicp.jpg",
    title: "SICP",
    author: "Harold Abelson, Gerald Jay Sussman, Julie Sussman",
    read: "not read",
    index: 9,
  },
  {
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1375771781i/12836498.jpg",
    title: "Mathematics for Computer Science",
    author: "Eric Lehman, F. Thomson Leighton, Albert R. Meyer",
    read: "not read",
    index: 10,
  },
  {
    cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627644403i/58661468.jpg",
    title: "Crafting Interpreters",
    author: "Robert Nystrom",
    read: "not read",
    index: 11,
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
      button.style.backgroundColor = "#57cce6";
      button.style.borderColor = "#57cce6";
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
  reduceCoverSize(image, title.length, author.length);

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

function reduceCoverSize(image, titleLength, authorLength) {
  let imageHeight = 70;
  if (authorLength > 40) {
    imageHeight -= imageHeight * 10 / authorLength;
  }
  if (titleLength > 40) {
    imageHeight -= imageHeight * 7 / titleLength;
  }
  image.style.height = `${imageHeight}%`
}

const form = document.getElementById("form");

const addBookMenu = document.getElementById("add-book-form");
document.getElementById("add-button").addEventListener('click', ()=>{
  const style = getComputedStyle(addBookMenu);
  const display = style.display;
  if (display === 'none') {
    addBookMenu.style.display = 'flex';
  } else {
    addBookMenu.style.display = 'none';
    form.reset();
  }
});

form.addEventListener('submit', addBookObject);

function addBookObject(event) {
    event.preventDefault();
    const formInput = new FormData(event.target);
    const bookObject = Object.fromEntries(formInput.entries());
    bookObject.read = "not read";
    bookObject.index = null;
    books.unshift(bookObject);
    updateBookShelf();
    form.reset();
    addBookMenu.style.display = 'none';
}

document.getElementById("close-form-button").addEventListener("click", ()=>{
  addBookMenu.style.display = 'none';
  form.reset();
});

document.getElementById("to-the-top-button").addEventListener("click", ()=>{
  const rootElement = document.documentElement;
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

(() => {
  const target = document.getElementById("header-title");
  const backToTheTopButton = document.getElementById("to-the-top-button");
  function callback(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        backToTheTopButton.style.opacity = '0'
      } else {
        backToTheTopButton.style.opacity = '80%'
      }
    });
  }
  const observer = new IntersectionObserver(callback);
  observer.observe(target);
})();

updateBookShelf();
