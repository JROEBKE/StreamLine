'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('teststations', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      postCode: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      houseNumber: {
        type: Sequelize.STRING
      },
      coordinates: {
        type: Sequelize.GEOMETRY('POINT', 4326)
      },
      openingTime: {
        type: Sequelize.TIME
      },
      closingTime: {
        type: Sequelize.TIME
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      stationType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Teststations');
  }
};
