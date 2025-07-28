const router = require("express").Router();

router.use(require('../controllers/ai/index.js'));
router.use(require('../controllers/user/index.js'))

module.exports = router;
