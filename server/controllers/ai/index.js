const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const aiServices = require("../../services/ai/index");

router.post("/ai/generate-article",auth, aiServices.generateArticle);   


module.exports = router;