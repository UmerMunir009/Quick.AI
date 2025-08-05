const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const {usageLimit} = require("../../middlewares/usageLimit");
const {premiumCheck}=require('./../../middlewares/premiumCheck')
const aiServices = require("../../services/ai/index");
const {upload} =require('../../utils/multer')

router.post("/ai/generate-article",auth,usageLimit, aiServices.generateArticle);   
router.post("/ai/generate-blogTitle",auth,usageLimit, aiServices.generateBlogTitles);   
router.post("/ai/generate-image",auth,usageLimit, aiServices.generateImages);   
router.post("/ai/remove-background",upload.single('image'),auth,usageLimit, aiServices.removeBackground);   
router.post("/ai/remove-object",upload.single('image'),auth,usageLimit, aiServices.removeObjects);   


module.exports = router;