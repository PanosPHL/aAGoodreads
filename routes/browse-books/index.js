const express = require('express');
const router = express.Router();
const { routeHandler } = require('../utils');

router.get(
  '/title',
  routeHandler(async (req, res) => {
    res.render('books-browse');
  })
);

module.exports = router;
