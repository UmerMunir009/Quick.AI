const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Creation } = require("./../../models");
const { generateContent } = require("../../utils/generateContent");

const generateArticle = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const { prompt, length } = req.body;
  const plan = req.plan;
  const free_usage = req.free_usage;

  if (plan !== "premium" && free_usage >= 10) {
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: TEXTS.UPDATE_PLAN,
      data: data,
    });
  }

  const content = await generateContent(prompt, length);

  const creationData = {user_id: userId,prompt,content,type: "article"};
  const data = await Creation.create(creationData);

  if (plan !== "premium") {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});

// const get = asyncErrorHandler(async (req, res) => {
//   let filters = {};
//   if (req.query?.key && req.query?.value) {
//     filters[req.query.key] = {
//       [Op.iLike]: `${req.query.value}%`,
//     };
//   }

//   const data = await Book.findAndCountAll({
//     where: filters,
//     include: [
//       {
//         model: Language,
//       },
//     ],
//     order: [["bookNo", "ASC"]],
//     ...req.pagination,
//   });

//   res.status(STATUS_CODES.SUCCESS).json({
//     statusCode: STATUS_CODES.SUCCESS,
//     message: TEXTS.FOUND,
//     data: data,
//   });
// });

// const getForApp = asyncErrorHandler(async (req, res) => {
//   let filter = {};

//   if (req.headers.lang) {
//     filter.langaugeId = req.headers.lang;
//   }
//   const data = await Book.findAndCountAll({
//     where: {
//       ...filter,
//     },
//     ...req.pagination,
//   });

//   res.status(STATUS_CODES.SUCCESS).json({
//     statusCode: STATUS_CODES.SUCCESS,
//     message: TEXTS.FOUND,
//     data: data,
//   });
// });

// const del = asyncErrorHandler(async (req, res) => {
//   const data = await Book.destroy({
//     where: {
//       id: req.params.id,
//     },
//   });

//   res.status(STATUS_CODES.SUCCESS).json({
//     statusCode: STATUS_CODES.SUCCESS,
//     message: TEXTS.DELETED,
//     data: data,
//   });
// });

// const update = asyncErrorHandler(async (req, res) => {
//   const data = await Book.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//     returning: true,
//   });

//   res.status(STATUS_CODES.SUCCESS).json({
//     statusCode: STATUS_CODES.SUCCESS,
//     message: TEXTS.UPDATED,
//     data: data,
//   });
// });

// const getBookContent = asyncErrorHandler(async (req, res) => {
//   const chapterNo = req.query.chapterNo || 1;
//   const data = await Chapter.findAll({
//     include: [
//       {
//         model: Content,
//       },
//     ],
//     where: {
//       bookId: req.params.bookId,
//       chapterNo: chapterNo,
//     },
//   });

//   res.status(STATUS_CODES.SUCCESS).json({
//     statusCode: STATUS_CODES.SUCCESS,
//     message: TEXTS.FOUND,
//     data: data,
//   });
// });

module.exports = {
  generateArticle,
};
