const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const bookshelfRouter = require('./bookshelf');
const booksRouter = require('./books');
const reviewsRouter = require('./reviews');
const searchRouter = require('./search');
const { environment } = require('../../config');
const { ValidationError } = require('sequelize');

router.use('/users', usersRouter);
router.use('/books', booksRouter);
router.use('/bookshelves', bookshelfRouter);
router.use('/reviews', reviewsRouter);
router.use('/search', searchRouter);

router.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
  }
  next(err);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = environment === 'production';
  if (!isProduction) console.log(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

router.get('/', (req, res) => {
  res.send('index root');
});

router.use('*', (req, res) => {
  res.status(404).json({ message: 'route does not exist' });
});

module.exports = router;
