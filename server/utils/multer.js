const multer = require('multer');

const storage = multer.diskStorage({});
  
module.exports.upload = multer({ storage: storage});