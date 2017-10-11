'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Addresses', 'UserId', {
      type: Sequelize.INTEGER
    });
  },
};
