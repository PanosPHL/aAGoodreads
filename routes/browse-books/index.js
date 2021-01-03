const express = require('express');
const router = express.Router();
const { routeHandler } = require('../utils');

router.get(
  '/',
  routeHandler(async (req, res) => {
    res.redirect('/browse/title');
  })
);

module.exports = router;
