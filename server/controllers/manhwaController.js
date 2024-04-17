const { Manhwa } = require("../models");
const axios = require("axios");

module.exports = class ManhwaController {
  static async getManhwa(req, res, next) {
    try {
      const options = {
        method: "GET",
        url: "https://api.jikan.moe/v4/manga",
        params: {
          page: 1,
          limit: 10,
          type: "manhwa",
          order_by: "popularity",
          sort: "desc",
        },
      };

      const { data } = await axios.request(options);
      const { pagination, data: list } = data;
      req.status(200).json(list);
    } catch (error) {
      next(error);
    }
  }

  static async createManhwa(req, res, next) {
    try {
      const manhwa = await Manhwa.create(req.body);
      res.status(201).json(manhwa);
    } catch (error) {
      next(error);
    }
  }
};
