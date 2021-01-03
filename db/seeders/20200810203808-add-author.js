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
      ],
      { fields: ['firstName', 'lastName', 'biography'] }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {});
  },
};
