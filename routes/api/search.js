const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { secret } = require('../../config').jwtConfig;
const { Book, Author, Publisher, Review } = require('../../db/models');
const { Op } = require('sequelize');

const { routeHandler } = require('../utils');

router.get(
  '/title/:title',
  routeHandler(async (req, res) => {
    const { token } = req.cookies;
    const payload = jwt.verify(token, secret);

    const books = await Book.findAll({
      where: {
        title: {
          [Op.substring]: req.params.title,
        },
      },
      include: [Author, Publisher, Review],
      order: [['title', 'ASC']],
    });

    res.json({ books, userId: payload.data.id });
  })
);

module.exports = router;
