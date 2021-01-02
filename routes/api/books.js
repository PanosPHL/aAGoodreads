const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { secret } = require('../../config').jwtConfig;
const { Book, Bookshelf, Author, Review, Series, Publisher, Genre, BookBookshelf, User } = require('../../db/models');
const { Op } = require('sequelize');

const { routeHandler } = require('../utils');

router.get('/', routeHandler(async (req, res) => {
    const books = await Book.findAll({
        include: [Author, Publisher, Review],
        order: [['title', 'ASC']]
    });

    res.json({ books });
}));


router.get('/:id(\\d+)', routeHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const { token } = req.cookies;
    const data = await jwt.verify(token, secret);
    const userId = data.data.id;
    const book = await Book.findByPk(id, {
        include: [Author, Series, Publisher, Genre, Bookshelf]
    });

    res.json({ book, userId });
}));

router.get('/:id(\\d+)/reviews', routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const data = await jwt.verify(token, secret);
    const userId = data.data.id;
    const reviews = await Review.findAll({
        where: {
            bookId: parseInt(req.params.id)
        },
        include: [User]
    });

    res.json({ reviews, userId });
}));

router.post('/:id(\\d+)', routeHandler(async (req, res) => {
    console.log(req.body);
    const bookId = parseInt(req.params.id);
    const { token } = req.cookies;
    const data = await jwt.verify(token, secret);
    const userId = data.data.id;

    const defaultShelfId = Number(...req.body.defaultShelf);
    const createdShelveIds = req.body.createdShelf || [];

    const destroyShelves = await Bookshelf.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Book,
                where: {
                    id: bookId
                }
            }
        ]
    });

    await BookBookshelf.destroy({
        where: {
            bookId,
            bookshelfId: {
                [Op.or]: [...destroyShelves.map((shelf) => shelf.id)]
            }
        }
    });

    await BookBookshelf.create({
        bookId,
        bookshelfId: defaultShelfId
    });

    if (createdShelveIds.length) {
        const createdShelves = await Bookshelf.findAll({
            attributes: ['id'],
            where: {
                id: {
                    [Op.or]: [...createdShelveIds]
                },
                userId
            }
        });

        for (const shelf of createdShelves) {
            await BookBookshelf.create({
                bookId,
                bookshelfId: shelf.dataValues.id
            });
        }

    }

    const book = await Book.findByPk(bookId, {
        include: [Bookshelf]
    });

    res.json({ book });
}));

module.exports = router;