const { checkingPassword, signToken } = require("../helper");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const axios = require("axios");

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

  static async loginUserGoogle(req, res, next) {
    try {
      const { google_token } = req.headers;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        default: {
          username: payload.name,
          email: payload.email,
          password: String(Math.random() * 1000000),
        },
      });

      const token = signToken({ id: user.id });

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserSelf(req, res, next) {
    try {
      const user = await User.findOne({
        where: { id: req.user.id },
        include: Review,
      });
      if (!user) throw { name: "NotFound" };

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserSelf(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) throw { name: "NotFound" };

      await user.update(req.body);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async updateUserIsRichSelf(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) throw { name: "NotFound" };

      if (!user.isRich) await user.update({ isRich: true });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async generateMidtransToken(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (user.isRich)
        throw { name: "BadRequest", message: "You already Rich" };

      const options = {
        method: "POST",
        url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Basic " + process.env.MIDTRANS_SERVER_KEY,
        },
        data: {
          transaction_details: {
            order_id: "MIDTRANS-" + Math.floor(Math.random() * 900000 + 100000),
            gross_amount: 100000,
          },
          credit_card: { secure: true },
        },
      };

      const midtransToken = await axios.request(options);

      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
};
