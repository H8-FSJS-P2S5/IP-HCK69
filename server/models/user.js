"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Review);
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full Name is required",
          },
          notNull: {
            msg: "Full Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "email is not a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password is required",
          },
          notNull: {
            msg: "password is required",
          },
          len: {
            msg: "password length between 8 and 16",
            args: [5, 16],
          },
        },
      },
      isRich: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      imageURL: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://i.pinimg.com/474x/94/cb/68/94cb68baea50bb98cdab65b74e731c1c.jpg",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashingPassword(user.password);
  });
  return User;
};
