"use strict";
const { hashingPassword } = require("../helper");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "First Admin",
        email: "iniAdmin@mail.com",
        password: hashingPassword("123456"),
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "First Staff",
        email: "iniStaff@mail.com",
        password: hashingPassword("123456"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
