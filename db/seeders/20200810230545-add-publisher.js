'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Publishers', [
      { name: 'Scholastic' },
      { name: 'Simon & Schuster' },
      { name: 'Farrar, Straus and Giroux' },
      { name: 'Black Belt Communications' },
      { name: 'iUniverse' },
      { name: 'Free Press' },
      { name: 'Bard Press' },
      { name: 'Touchstone' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Publishers', null, {});
  },
};
