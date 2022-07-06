const express = require("express");
const dotenv = require("dotenv");
const bookRoute = require("./routes/books");
const bodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
dotenv.config();

const server = express();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  // console.log("Server ready at port", PORT);
  console.log(`Server ready at http://localhost:${PORT}`);
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(CookieParser());
// server.use(bodyParser());
server.use("/books", bookRoute);

// server.use("/", (req, res, next) => {
//   switch (req.method) {
//     case "GET":
//       homeGet(req, res);
//       break;

//     default:
//       break;
//   }
// });

// function homeGet(req, res) {
//   // res.send("hello");
//   res.json({
//     ok: true,
//   });
// }
