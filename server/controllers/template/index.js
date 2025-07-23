const router = require("express").Router();
const bookServices = require("../../services/book/index");

router.post("/book/create", bookServices.create);   
router.get("/book/get", bookServices.get);   
router.get("/book", bookServices.getForApp);   
router.get("/book/get/:bookId", bookServices.getBookContent);   
router.delete("/book/:id", bookServices.del);   
router.patch("/book/:id", bookServices.update);   


module.exports = router;