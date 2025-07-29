const asyncErrorHandler = require("./../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("./../config/constants");

module.exports.premiumCheck = asyncErrorHandler( (req, res, next) => {
  if (req.plan !== "premium" ) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      statusCode: STATUS_CODES.UNAUTHORIZED,
      message: TEXTS.PREMIUM_PLAN,
    });
  }
  next();
}
)