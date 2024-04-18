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

      const manhwaList = list.map((el) => {
        return {
          mal_id: el.mal_id,
          title: el.title,
          chapter: el.chapters,
          status: el.status,
          imageURL: el.images.jpg.image_url,
          url: el.url,
          synopsis: el.synopsis,
        };
      });

      req.status(200).json({ manhwaList, pagination });
    } catch (error) {
      next(error);
    }
  }

  static async getManhwaById(req, res, next) {
    const { id } = req.params;
    try {
      const options = {
        method: "GET",
        url: "https://api.jikan.moe/v4/manga/" + id,
      };
      const { data } = await axios.request(options);

      const manhwa = {
        mal_id: data.mal_id,
        title: data.title,
        chapter: data.chapters,
        status: data.status,
        imageURL: data.images.jpg.image_url,
        url: data.url,
        synopsis: data.synopsis,
      };

      req.status(200).json(manhwa);
    } catch (error) {
      next(error);
    }
  }

  static async createManhwa(req, res, next) {
    const { id } = req.params;
    try {
      const { data: manhwa } = await Manhwa.findOne({ where: { mal_id: id } });
      if (!manhwa) {
        const options = {
          method: "GET",
          url: "https://api.jikan.moe/v4/manga/" + id,
        };
        const { data } = await axios.request(options);

        await Manhwa.Create({
          mal_id: data.mal_id,
          title: data.title,
          chapter: data.chapters,
          status: data.status,
          imageURL: data.images.jpg.image_url,
          url: data.url,
          synopsis: data.synopsis,
        });
      }

      res.status(201).json({ message: "success to create" });
    } catch (error) {
      next(error);
    }
  }
};
