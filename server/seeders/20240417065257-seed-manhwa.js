"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const options = {
      method: "GET",
      url: "https://api.jikan.moe/v4/top/manga",
      params: { type: "manhwa" },
    };

    try {
      const { data } = await axios.request(options);
      const { pagination, data: list } = data;

      const manhwaList = list.map((el) => {
        return {
          mal_id: el.mal_id,
          title: el.title,
          chapter: el.chapters,
          status: el.status,
          imageURL: el.images.jpg.image_url,
          url: el.url,
          synopsis: el.synopsis,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      await queryInterface.bulkInsert("Manhwas", manhwaList);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Manhwas", null, {});
  },
};
