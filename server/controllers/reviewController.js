const { Review, User, Manhwa } = require("../models");

module.exports = class ReviewController {
  static async getReview(req, res, next) {
    try {
      const { sort, page, search } = req.query;
      const paramsQuerySQL = {};

      paramsQuerySQL.include = [User, Manhwa];

      paramsQuerySQL.where = search
        ? { title: { [Op.like]: "%" + search + "%" } }
        : {};

      if (sort) {
        const ordering = sort[0] == "-" ? "DESC" : "ASC";
        const colName = ordering == "DESC" ? sort.slice(1) : sort;
        paramsQuerySQL.order = [[colName, ordering]];
      }

      let limit = 5;
      let pageNumber = 1;
      if (page) {
        if (page.size) {
          limit = page.size;
        }
        if (page.number) {
          pageNumber = page.number;
        }
      }
      paramsQuerySQL.limit = limit;
      paramsQuerySQL.offset = limit * (pageNumber - 1);

      const { count, rows } = await Review.findAndCountAll(paramsQuerySQL);
      res.status(200).json({
        page: +pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: +limit,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createReview(req, res, next) {
    try {
      req.body.UserId = req.user.id;
      const review = await Review.create(req.body);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  static async getReviewById(req, res, next) {
    const { id } = req.params;
    try {
      const review = await Review.findByPk(id);
      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  }

  static async updateReview(req, res, next) {
    const { id } = req.params;
    try {
      const review = await Review.findByPk(id);

      await review.update(req.body);

      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req, res, next) {
    const { id } = req.params;
    try {
      const review = await Review.findByPk(id);

      await review.destroy();

      res.status(200).json({ message: `${review.title} success to delete` });
    } catch (error) {
      next(error);
    }
  }
};
