'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Rent)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Username Cannot be Null"},
        notEmpty: {msg: "Username Cannot be Empty"}
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "Email already exists"},
      validate: {
        notNull: {msg: "Email Cannot be Null"},
        notEmpty: {msg: "Email Cannot be Empty"},
        isEmail: {msg: "Must be Email format"},
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Password Cannot Null"},
        notEmpty: {msg: "Password Cannot Empty"},
      len: {
        args: [5,20],
        msg: "password must contain at leat 5 caracter"
      },
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "Client"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};