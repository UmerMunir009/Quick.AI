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
  console.log(data);

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});

const getCommunityCreations = asyncErrorHandler(async (req, res) => {
  const data = await Creation.findAll({ where: { publish: true },order: [["createdAt", "DESC"]], });

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});

const toggleCreationLike = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const { creationId } = req.body;
  // const creationExists = await Creation.findOne({ where: { id: creationId } });
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

  // const exists = await Like.findOne({where: { creation_id: creationId, user_id: userId },});
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
