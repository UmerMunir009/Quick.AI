const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("./../config/constants");

module.exports.usageLimit = asyncErrorHandler(async (req, res, next) => {
  if (req.plan !== "premium" && req.free_usage >= 100) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      statusCode: STATUS_CODES.UNAUTHORIZED,
      message: TEXTS.UPDATE_PLAN,
    });
  }
  next();
}
)