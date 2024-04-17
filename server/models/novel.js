"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Novel extends Model {
    static associate(models) {
      Novel.hasMany(models.Review);
    }
  }
  Novel.init(
    {
      mal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chapter: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageURL: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Novel",
    }
  );
  return Novel;
};
