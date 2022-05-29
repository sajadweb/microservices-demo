require("dotenv").config();
const express = require("express");
const client = require("../grpc/client");

// Connect
require("../db/db");

const Book = require("./Book");

const app = express();
const port = process.env.BOOK_PORT;
app.use(express.json());

app.post("/book", (req, res) => {
  const newBook = new Book({ ...req.body });
  newBook
    .save()
    .then(() => {
      res.send("New Book created successfully!");
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error!");
    });
});

app.get("/books", (req, res) => {
  Book.find()
    .then((books) => {
      if (books.length !== 0) {
        res.json(books);
      } else {
        res.status(404).send("Books not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error!");
    });
});

app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).send("Books not found");
      }
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error!");
    });
});

app.delete("/book/:id", (req, res) => {
  Book.findOneAndRemove(req.params.id)
    .then((book) => {
      if (book) {
        res.json("Book deleted Successfully!");
      } else {
        res.status(404).send("Book Not found!");
      }
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error!");
    });
});

app.get("/v", (req, res) => {
  res.status(200).send(`Book Version 2 and Running on port ${port}`);
});
app.get("/news", (req, res) => {
  client.getAllNews({}, (error, news) => {
    res.json(news?.news);
  });
});
app.listen(port, () => {
  console.log(`Up and Running on port ${port} - This is Book service`);
});
