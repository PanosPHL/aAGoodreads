'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('BookGenres', [
      { bookId: 1, genreId: 1 },
      { bookId: 2, genreId: 2 },
      { bookId: 2, genreId: 3 },
      { bookId: 3, genreId: 1 },
      { bookId: 3, genreId: 2 },
      { bookId: 3, genreId: 3 },
      { bookId: 4, genreId: 2 },
      { bookId: 5, genreId: 1 },
      { bookId: 6, genreId: 2 },
      { bookId: 7, genreId: 1 },
      { bookId: 7, genreId: 2 },
      { bookId: 8, genreId: 4 },
      { bookId: 9, genreId: 5 },
      { bookId: 10, genreId: 5 },
      { bookId: 11, genreId: 6 },
      { bookId: 12, genreId: 7 },
      { bookId: 13, genreId: 5 },
      { bookId: 14, genreId: 5 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BookGenres', null, {});
  },
};
