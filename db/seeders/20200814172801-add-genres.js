'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      { name: 'Wizards' },
      { name: 'Sci-fi' },
      { name: 'Muggles' },
      { name: 'Biographical' },
      { name: 'Self-Help' },
      { name: 'Philosophy' },
      { name: 'Fiction' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  },
};
