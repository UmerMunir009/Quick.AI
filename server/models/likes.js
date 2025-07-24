'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.Creation, {foreignKey: "creation_id",as: "likes",});

    }
  }
  Like.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      creation_id: {
        type: Sequelize.UUID,
        allowNull:false,
      },

      user_id: {
        type: Sequelize.STRING,
        allowNull:false
      },
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'likes'
  });
  return Like;
};