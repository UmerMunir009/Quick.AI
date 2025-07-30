const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Creation, Like } = require("./../../models");
const { where } = require("sequelize");

const getUserCreations = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const data = await Creation.findAll({
    where: { user_id: userId },
    order: [["createdAt", "DESC"]],
  });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});

const getCommunityCreations = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const creations = await Creation.findAll({where: { publish: true },order: [["createdAt", "DESC"]]});

  const creationsWithLikes = await Promise.all(
    creations.map(async (item) => {
      const likeCount = await Like.count({
        where: { creation_id: item.id },
      });

      const liked = await Like.findOne({
        where: {
          creation_id: item.id,
          user_id: userId,
        },
      });

      return {
        ...item.toJSON(),
        likes: likeCount,
        liked: liked?true:false,
      };
    })
  );

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: creationsWithLikes,
  });
});


const toggleCreationLike = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const { creationId } = req.body;
    const [creationExists, exists] = await Promise.all([
      Creation.findOne({ where: { id: creationId } }),
      Like.findOne({ where: { creation_id: creationId, user_id: userId } }),
    ]);
  if (!creationExists) {
    return res.status(STATUS_CODES.NOT_FOUND).json({
      statusCode: STATUS_CODES.NOT_FOUND,
      message: TEXTS.NOT_FOUND,
    });
  }
  if (exists) {
    await Like.destroy({ where: { creation_id: creationId, user_id: userId } });
    return res.status(STATUS_CODES.SUCCESS).json({
      statusCode: STATUS_CODES.SUCCESS,
      message: TEXTS.UN_LIKED,
      liked: false,
    });
  }
  await Like.create({ creation_id: creationId, user_id: userId });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.LIKED,
    liked: true,
  });
});

module.exports = {
  getUserCreations,
  getCommunityCreations,
  toggleCreationLike,
};
