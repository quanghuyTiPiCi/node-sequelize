'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'example@example.com',
        password: '123456',
        firstName: 'Tran',
        lastName: 'Huy',
        address: 'Da nang',
        gender: '1',
        roleId: '',
        phoneNumber: '0909999999',
        image: '',
        positionId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
