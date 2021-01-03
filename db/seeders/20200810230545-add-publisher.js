'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Publishers', [
      { name: 'Scholastic' },
      { name: 'Simon & Schuster' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Publishers', null, {});
  },
};
