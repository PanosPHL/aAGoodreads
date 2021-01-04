'use strict';

const { query } = require('express');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Authors',
      [
        { firstName: 'J.K.', lastName: 'Rowling', biography: 'Is an author!' },
        {
          firstName: 'Miles',
          lastName: 'Davis',
          biography: 'Great trumpet player',
        },
        {
          firstName: 'Daniel',
          lastName: 'Kahneman',
          biography: 'Writer and author',
        },
        {
          firstName: 'Bruce',
          lastName: 'Lee',
          biography: 'Martial artist',
        },
        {
          firstName: 'Sun',
          lastName: 'Tsu',
          biography: 'Author',
        },
        {
          firstName: 'Aravind',
          lastName: 'Adiga',
          biography: 'Author',
        },
        {
          firstName: 'Gary',
          lastName: 'Keller',
          biography: 'Author',
        },
        {
          firstName: 'Bruce',
          lastName: 'Pandolfini',
          biography: 'Chess master',
        },
      ],
      { fields: ['firstName', 'lastName', 'biography'] }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {});
  },
};
