const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { secret } = require('../../config').jwtConfig;
const {
  Bookshelf,
  Book,
  Author,
  User,
  Review,
  BookBookshelf,
} = require('../../db/models');
const { Sequelize, Op } = require('sequelize');
const { routeHandler, handleValidationErrors } = require('../utils');
const { check } = require('express-validator');

const validateBookshelfName = [
  check('name', 'Please provide a valid bookshelf name and try again')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 255 }),
];

router.get(
  '/',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, secret).data;

    const bookshelves = await Bookshelf.findAll({
      where: {
        userId: id,
      },
      include: {
        model: Book,
        attributes: ['id'],
      },
    });

    res.json({
      bookshelves,
    });
  })
);

router.get(
  '/:id(\\d+)',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, secret).data;

    const bookshelf = await Bookshelf.findOne({
      where: {
        userId: id,
        id: parseInt(req.params.id),
      },
    });

    res.json({
      bookshelf,
    });
  })
);

router.get(
  '/data',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, secret).data;

    const books = await Book.findAll({
      attributes: ['id', 'title', 'cover'],
      include: [
        {
          model: Bookshelf,
          attributes: ['id', 'name'],
          where: {
            userId: id,
          },
          through: {
            attributes: ['createdAt'],
          },
        },
        {
          model: Author,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Review,
          attributes: ['rating'],
          where: {
            userId: id,
          },
          required: false,
        },
      ],
    });

    res.json({
      books,
    });
  })
);

router.get(
  '/data/:id(\\d+)',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, secret).data;

    const books = await Book.findAll({
      attributes: ['id', 'title', 'cover'],
      include: [
        {
          model: Bookshelf,
          attributes: ['id', 'name'],
          where: {
            id: parseInt(req.params.id),
            userId: id,
          },
          through: {
            attributes: ['createdAt'],
          },
        },
        {
          model: Author,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Review,
          attributes: ['rating'],
          where: {
            userId: id,
          },
          required: false,
        },
      ],
    });

    res.json({
      books,
    });
  })
);

router.get(
  '/book-count',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, secret).data;

    const books = await Book.findAll({
      attributes: ['id'],
      include: [
        {
          model: Bookshelf,
          attributes: ['id', 'name'],
          where: {
            userId: id,
          },
          through: {
            attributes: ['createdAt'],
          },
        },
        // ,
        // {
        //     model: Author,
        //     attributes: ['firstName', 'lastName']
        // }, {
        //     model: Review,
        //     attributes: ['rating'],
        //     where: {
        //         userId: id
        //     }
        // }
      ],
    });

    res.json({
      count: books.length,
    });
  })
);

router.get(
  '/createdShelves',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const data = jwt.verify(token, secret);
    const { id: userId } = data.data;
    const bookshelves = await Bookshelf.findAll({
      where: {
        userId,
        defaultShelf: false,
      },
    });

    res.json({
      bookshelves,
    });
  })
);

router.post(
  '/',
  validateBookshelfName,
  handleValidationErrors,
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, secret).data;

    const { name } = req.body;
    const bookshelf = await Bookshelf.create({
      userId: id,
      name,
      defaultShelf: false,
    });
    res.json({
      bookshelf,
    });
  })
);

router.delete(
  '/:id(\\d+)',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id: userId } = jwt.verify(token, secret).data;

    await BookBookshelf.destroy({
      where: {
        bookshelfId: parseInt(req.params.id),
      },
    });

    await Bookshelf.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json({ message: 'Success' });
  })
);

router.delete(
  '/book/:id(\\d+)',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, secret).data;

    const bookId = req.params.id;

    const bookshelves = await Bookshelf.findAll({
      where: {
        userId: id,
      },
    });

    const bookshelfIds = bookshelves.map((bookshelf) => bookshelf.id);

    await BookBookshelf.destroy({
      where: {
        [Op.and]: {
          bookId,
          bookshelfId: {
            [Op.or]: [...bookshelfIds],
          },
        },
      },
    });

    res.json({
      text: 'Operation complete!',
    });
  })
);

module.exports = router;
