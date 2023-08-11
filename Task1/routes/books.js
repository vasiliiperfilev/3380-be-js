const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/').post(async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;

  const newBook = await new Book({
    title, author, description
  });

  newBook
    .save()
    .then(() => res.json(newBook))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (book === null) {
        res.status(404).json('Not found')
        return
      }
      res.json(book)
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then((book) => {
      if (book === null) {
        res.status(404).json('Not found')
        return
      }
      res.json('Book deleted.')
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  if (!req.body.title || !req.body.author || !req.body.description) {
    res.status(400).json('Error: all params must be includet in PUT request')
    return
  }
  Book.findById(req.params.id)
    .then((book) => {
      if (book === null) {
        res.status(404).json('Not found')
        return
      }
      book.title = req.body.title;
      book.author = req.body.author;
      book.description = req.body.description;
      book
        .save()
        .then(() => res.json(book))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
