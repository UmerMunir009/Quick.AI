'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Creation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Creation.hasMany(models.Like,{foreignKey:'creation_id',as:"creation_likes"})
    }
  }
  Creation.init({
     id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      prompt: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      type: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      publish: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      }
  }, {
    sequelize,
    modelName: 'Creation',
    tableName: 'creations'
  });
  return Creation;
};