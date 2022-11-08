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

// use local storage to save library content

if ("library" in localStorage) {
  books = JSON.parse(localStorage.getItem("library"));
}

const bookShelf = document.getElementById("book-shelf");

// run this function to update the book shelf based on data 
// from the book object array

function updateBookShelf() {
  updateBookIndexes();
  bookShelf.innerHTML = '';
  books.forEach(book => {
    bookShelf.appendChild(renderBook(book.cover, book.title, book.author,
      book.read, book.index));
  });
  updateBookIndexes();
  updateReadButtonColor();
  updateStats();
  displayMessageIfEmpty();
  localStorage.setItem("library", JSON.stringify(books));
}

// adjust book object index properties when a adding/removing books

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

// render book objects from book array

function renderBook(cover, title, author, read, index) {
  const book = document.createElement("div");
  book.classList.add("book");
  book.id = title.replace(/\s/g, '');
  book.setAttribute("tabindex", 0);

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

  const moveLeftButton = document.createElement("button");
  const moveRightButton = document.createElement("button");
  moveLeftButton.innerHTML = "&#8226";
  moveRightButton.innerHTML = "&#8226";
  moveLeftButton.classList.add("move-left-button");
  moveRightButton.classList.add("move-right-button");
  book.appendChild(moveLeftButton);
  book.appendChild(moveRightButton);

  moveLeftButton.addEventListener("click", () => {
    const book = books.slice(index, index + 1)[0];
    books.splice(index, 1);
    updateBookShelf();
    if (index === 0) {
      books.splice(books.length, 0, book);
      updateBookShelf();
    } else {
      books.splice(index - 1, 0, book);
      updateBookShelf();
      const id = books[index - 1].title.replace(/\s/g, '');
      document.getElementById(id).focus();
    }
  });

  moveRightButton.addEventListener("click", () => {
    const book = books.slice(index, index + 1)[0];
    books.splice(index, 1);
    updateBookShelf();
    if (index === books.length) {
      books.splice(0, 0, book);
      updateBookShelf();
    } else {
      books.splice(index + 1, 0, book);
      updateBookShelf();
      const id = books[index + 1].title.replace(/\s/g, '');
      document.getElementById(id).focus();
    }
  });

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

// adjust book cover size based on title/author's name string length

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

// form input menu button

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

// add book objects to the book array using FormData api

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

// to the top button, using intersection observer api

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

// search form

/* search input form
  take user input and put it into input variable, use array
  .filter() and .includes() methods to search books array
  properties for mathching objects, generate a list of
  links */

(() => {
  let input = '';
  let searchTitleOrAuthor = "title"

  const searchTitleOrAuthorButton = 
    document.getElementById("search-title-or-author");
  searchTitleOrAuthorButton.addEventListener("click", () => {
    if (searchTitleOrAuthorButton.innerHTML === "search by title") {
      searchTitleOrAuthorButton.innerHTML = "search by author";
      searchTitleOrAuthor = "author";
    } else {
      searchTitleOrAuthorButton.innerHTML = "search by title";
      searchTitleOrAuthor = "title";
    }
  })

  const searchBar = document.getElementById('search-bar');
  const searchResultsContainer = 
  document.getElementById('search-results-container');

  searchBar.addEventListener('input', (event) => {
    searchResultsContainer.style.display = 'flex';
    searchResultsContainer.innerHTML = '';
    if(event.data === null) {
      input = input.slice(0, -1); 
    } else {
      input += event.data;
    }
    let result = books.filter(book => {
      if (searchTitleOrAuthor === "author") {
        return book.author.toLowerCase().includes(input.toLowerCase());
      } else {
        return book.title.toLowerCase().includes(input.toLowerCase());
      }
    });
    const length = result.length - 1;
    buildSearchList(length, result);
    if (input === '') {
      searchResultsContainer.innerHTML = '';
      searchResultsContainer.style.display = 'none';
    } else if (searchResultsContainer.innerHTML === '') {
      searchResultsContainer.style.display = 'none';
    }
  })

  function createLinks(index, result) {
    const searchResultLink = document.createElement('a');
    searchResultLink.classList.add('search-link');
    if (searchTitleOrAuthor === "author") {
      searchResultLink.innerHTML = `${result[index].author}: ${result[index].title}`;
    } else {
      searchResultLink.innerHTML = result[index].title;
    }
    searchResultLink.addEventListener('click', () => {
      searchResultsContainer.style.display = 'none';
      const id = result[index].title.replace(/\s/g, '');
      document.getElementById(id).scrollIntoView();
      document.getElementById(id).focus();
      input = "";
      searchBar.value = "";
      addBookMenu.style.display = 'none';
    });
    return searchResultLink;
  }

  function buildSearchList(length, result) {
    if (length === -1) {
      return;
    } else {
      searchResultsContainer.appendChild(createLinks(length, result));
      return buildSearchList(length - 1, result);
    }
  }
})();

// Update stats

const booksInLibrary = document.getElementById("books-in-library-stats")
const booksRead = document.getElementById("books-read-stats");

function updateStats() {
  let inLibrary = 0;
  let read = 0;
  books.forEach(book => {
    inLibrary += 1;
    if (book.read === "✓read") {
      read += 1;
    }
  });
  if (inLibrary === 1) {
    booksInLibrary.innerHTML = `${inLibrary} book in library`;
  } else {
    booksInLibrary.innerHTML = `${inLibrary} books in library`;
  };
  if (read === 1) {
    booksRead.innerHTML = `${read} book read`;
  } else {
    booksRead.innerHTML = `${read} books read`;
  }
}

// Display a message when library is empty

function displayMessageIfEmpty() {
  if (books.length === 0) {
    bookShelf.innerHTML = `<p id="empty-page-message">There's nothing in here, press <span>the plus button</span> to add a book to your library.</p>`
  }
}

updateBookShelf();
