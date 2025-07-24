const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("./../config/constants");

module.exports.usageLimit = asyncErrorHandler( (req, res, next) => {
  if (req.plan !== "premium" && req.free_usage >= 10) {
    return res.status(STATUS_CODES.CONFLICT).json({
      statusCode: STATUS_CODES.CONFLICT,
      message: TEXTS.UPDATE_PLAN,
    });
  }
  next();
}
)