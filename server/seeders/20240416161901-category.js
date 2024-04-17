'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let categoriesData = require('../data/category.json').map((item) => {
      
      item.createdAt = new Date()
      item.updatedAt = new Date()
      
      return item
   })
   await queryInterface.bulkInsert("Categories", categoriesData)

   let FieldsData = require('../data/Field.json').map((item) => {
      
    item.createdAt = new Date()
    item.updatedAt = new Date()
    
    return item
 })
 await queryInterface.bulkInsert("Fields", FieldsData)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Categories');
    await queryInterface.bulkDelete('Fields');
  }
};
