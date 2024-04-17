'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rent.belongsTo(models.User)
      Rent.belongsTo(models.Field)
    }
  }
  Rent.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Title Cannot be Null"},
        notEmpty: {msg: "Title Cannot be Empty"},
      },
    },
    FieldId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Field Cannot be Null"},
        notEmpty: {msg: "Field Cannot be Empty"},
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Session Cannot be Null"},
        notEmpty: {msg: "Session Cannot be Empty"},
      }
    },
    startTime:{
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {msg: "Start Time Cannot be Null"},
        notEmpty: {msg: "Start Time Cannot be Empty"},
      }
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {msg: "End Time Cannot be Null"},
        notEmpty: {msg: "End Time Cannot be Empty"},
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Rent',
  });
  return Rent;
};