'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'BookAuthors',
      [
        { bookId: 1, authorId: 1 },
        { bookId: 2, authorId: 1 },
        { bookId: 3, authorId: 1 },
        { bookId: 4, authorId: 1 },
        { bookId: 5, authorId: 1 },
        { bookId: 6, authorId: 1 },
        { bookId: 7, authorId: 1 },
        { bookId: 8, authorId: 2 },
        { bookId: 9, authorId: 3 },
        { bookId: 10, authorId: 4 },
        { bookId: 11, authorId: 5 },
        { bookId: 12, authorId: 6 },
      ],
      { fields: ['bookId', 'authorId'] }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
