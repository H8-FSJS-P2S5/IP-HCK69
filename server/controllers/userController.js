const { User } = require("../models");

module.exports = class UserController {
  static async registerUser(req, res, next) {
    try {
      const user = await User.create(req.body);

      res.status(201).json({
        id: user.id,
        fullName: user.fullName,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password)
        throw {
          name: "BadRequest",
          message: "email and password are required",
        };

      const user = await User.findOne({ where: { email } });

      if (!user || !checkingPassword(password, user.password))
        throw { name: "InvalidUser", message: "invalid email/password" };

      const token = signToken({ id: user.id });

      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }

  static async loginUserGoogle(req, res, next) {}

  static async getUserById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) throw { name: "NotFound" };

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) throw { name: "NotFound" };

      await user.update(req.body);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserIsRichById(req, res, next) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) throw { name: "NotFound" };

      if (!user.isRich) await user.update({ isRich: true });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
};
