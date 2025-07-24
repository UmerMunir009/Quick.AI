const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const {usageLimit} = require("../../middlewares/usageLimit");
const {premiumCheck}=require('./../../middlewares/premiumCheck')
const aiServices = require("../../services/ai/index");

router.post("/ai/generate-article",auth,usageLimit, aiServices.generateArticle);   
router.post("/ai/generate-blogTitle",auth,usageLimit, aiServices.generateBlogTitles);   
router.post("/ai/generate-blogTitle",auth,premiumCheck, aiServices.generateArticle);   


module.exports = router;