const { getAllBooks } = require("../helpers/fs");
const { createBook } = require("../helpers/fs");
const { getOneBook } = require("../helpers/fs");
const { updateBook } = require("../helpers/fs");
const { deleteBook } = require("../helpers/fs");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const books = await getAllBooks();

  res.status(200).json({
    ok: true,
    books,
  });
});

router.post("/", async (req, res) => {
  const { name, author } = req.body;

  if (!name || !author) {
    return res.status(400).json({
      ok: false,
      message: "Fields name and author are required",
    });
  }

  const book = await createBook(name, author);

  if (!book) {
    return res.status(400).json({
      ok: false,
      message: "Book with this name already exists",
    });
  }

  res.status(200).json({
    ok: true,
    message: "CREATED",
    book,
  });
});

router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;

  const book = await getOneBook(slug.toLowerCase());

  if (!book) {
    return res.status(404).json({
      ok: false,
      message: "Book_not_found",
    });
  }

  res.status(200).json({
    ok: true,
    book,
  });
});

router.patch("/:slug", async (req, res) => {
  const { slug } = req.params;

  const book = await updateBook(slug, req.body);

  res.status(200).json({
    ok: true,
    message: "BOOK_UPDATED",
    book,
  });
});

router.delete("/:slug", async (req, res) => {
  const { slug } = req.params;

  const book = await deleteBook(slug);

  res.status(200).json({
    ok: false,
    message: "DELETED",
    book,
  });
});
module.exports = router;
// router.get("/", (req, res) => {
//   res.json({
//     ok: true,
//   });
// });

// router.post("/", (req, res) => {
//   res.status(201).json({
//     ok: true,
//     message: "CREATED",
//   });
// });

/*
GET /books => send all books
POST /books => create book
GET /books/1 => send book with id 1
PATCH /books/1 => update book with id 1
DELETE /books/2 => delete books with id 2

*/
