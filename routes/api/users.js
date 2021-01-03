const express = require('express');
const router = express.Router();
const { routeHandler, handleValidationErrors } = require('../utils');
const { getUserToken } = require('../utils/auth');
const csrfProtection = require('csurf')({ cookie: true });
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const { secret, expiresIn } = require('../../config').jwtConfig;
const db = require('../../db/models');
const { Op } = require('sequelize');
const { User } = db;
const { createDefaultBookshelves } = require('../utils/defaultBookshelf');

const { check, validationResult } = require('express-validator');

const validateName = [
  check('name', 'Name field must be a valid first and last name')
    .exists()
    .custom((value, { req }) => {
      return /^[A-Z][a-z]*\s([A-Z][a-z]*)$/.test(value);
    }),
];

const validateAuth = [
  check('email', 'Email field must have a valid email.').exists().isEmail(),
  check('password', 'Password field must be six or more characters.')
    .exists()
    .isLength({ min: 6, max: 70 }),
];

//signing up
router.post(
  '/',
  validateName,
  validateAuth,
  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const nameArr = name.split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr[1];

    const user = await User.create({
      email,
      hashedPassword: bcrypt.hashSync(password, 10),
      firstName,
      lastName,
    });

    // Create default user bookshelves All, Read, Currently Reading, Want to Read
    await createDefaultBookshelves(user);

    const token = await getUserToken(user);
    res.cookie('token', token, { maxAge: expiresIn * 1000 });
    res.json({ id: user.id, token });
  })
);

// logging in
router.post(
  '/token',
  validateAuth,
  handleValidationErrors,
  routeHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user || !user.validatePassword(password)) {
      const err = new Error('Invalid email/password combination');
      err.status = 401;
      err.title = 'Unauthorized';
      throw err;
    }
    const token = await getUserToken(user);
    res.cookie('token', token, { maxAge: expiresIn * 1000 });
    res.json({ id: user.id, token });
  })
);

//logout
router.delete(
  '/logout',
  routeHandler(async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'logged out' });
  })
);

module.exports = router;
