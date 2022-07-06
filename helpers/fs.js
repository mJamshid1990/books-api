const fs = require("fs").promises;
const path = require("path");
const slugify = require("slugify");

const dbPath = path.join(__dirname, "..", "data.json");

function createSlug(key) {
  return slugify(key, {
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
}

async function getAllBooks() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data).books;
}

async function getOneBook(slug) {
  const books = await getAllBooks();
  return books.find((el) => el.slug === slug);
}

async function createBook(name, author) {
  const slug = createSlug(name);
  const book = await getOneBook(slug);

  if (book) false;

  const newBook = {
    name,
    author,
    slug: slug,
  };

  const books = await getAllBooks();

  books.push(newBook);

  await fs.writeFile(dbPath, JSON.stringify({ books }));

  return newBook;
}

async function updateBook(slug, body) {
  const book = await getOneBook(slug);

  if (!book) return false;

  const books = await getAllBooks();
  // const bookIndex = books.indexOf(book);
  const bookIndex = books.findIndex((el) => el.slug === slug);

  const newSlug = body.name ? createSlug(body.name) : book.slug;

  body.slug = newSlug;

  books[bookIndex] = { ...book, ...body };

  await fs.writeFile(dbPath, JSON.stringify({ books }));

  return { ...book, ...body };
}

async function deleteBook(slug) {
  const books = await getAllBooks();
  const book = await getOneBook(slug);

  if (!book) return false;

  const bookIndex = books.findIndex((el) => el.slug === slug);

  books.splice(bookIndex, 1);

  await fs.writeFile(dbPath, JSON.stringify({ books }));

  return book;
}

module.exports = {
  getAllBooks,
  getOneBook,
  createBook,
  updateBook,
  deleteBook,
};
