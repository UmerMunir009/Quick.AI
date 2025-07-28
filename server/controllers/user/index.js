const router = require("express").Router();
const { auth } = require("../../middlewares/auth");
const userServices = require("../../services/user/index");

router.get("/user/creations",auth, userServices.getUserCreations);   
router.get("/user/community-creations",auth, userServices.getCommunityCreations);   
router.post("/user/toggleLike",auth, userServices.toggleCreationLike);   

module.exports = router;