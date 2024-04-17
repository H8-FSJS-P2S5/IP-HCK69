const { User, Review } = require("../models");
const { verifyToken } = require("../helper");

module.exports = {
  authentication: async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    try {
      if (!bearerToken)
        throw { name: "InvalidUser", message: "you need to login first" };

      const [, token] = bearerToken.split(" ");

      if (!token)
        throw { name: "InvalidUser", message: "you need to login first" };

      const decodedToken = verifyToken(token);
      const user = await User.findByPk(decodedToken.id);

      if (!user)
        throw { name: "InvalidUser", message: "you need to login first" };

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },

  guardAdminOnly: (req, res, next) => {
    try {
      if (req.user.role != "Admin") throw { name: `ForbiddenAccess` };
      next();
    } catch (error) {
      next(error);
    }
  },

  guardAuthorOnly: async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await Review.findByPk(id);
      if (req.user.id != review.UserId) throw { name: `ForbiddenAccess` };
      next();
    } catch (error) {
      next(error);
    }
  },

  errorHandlers: (err, req, res, next) => {
    console.log(err);
    if (
      err.name == "SequelizeValidationError" ||
      err.name == "SequelizeUniqueConstraintError"
    ) {
      const message = err.errors.map((el) => el.message);
      return res.status(400).json({ message });
    }
    if (err.name == "BadRequest") {
      return res.status(400).json({ message: err.message });
    }
    if (err.name == "InvalidUser" || err.name == "JsonWebTokenError") {
      return res.status(401).json({ message: err.message });
    }
    if (err.name == "ForbiddenAccess") {
      return res.status(403).json({ message: "you do not have access rights" });
    }
    if (err.name == "NotFound") {
      return res.status(404).json({ message: "NotFound" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  },
};
