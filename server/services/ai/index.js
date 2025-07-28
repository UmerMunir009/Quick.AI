const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Creation } = require("./../../models");
const { generateContent } = require("../../utils/generateContent");
const { generateImage } = require("../../utils/generateImage");
const { removeBg } = require("../../utils/removeBg");
const {removeObject} =require('../../utils/removeObject')

const generateArticle = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const { prompt, length } = req.body;
  const plan = req.plan;
  
  const content = await generateContent(prompt, length);
  const creationData = {user_id: userId,prompt,content,type: "article"};
  const data = await Creation.create(creationData);
  console.log('Inserted into DB successfully')
  
  const free_usage = req.free_usage;
  if (plan !== "premium") {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});


const generateBlogTitles = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const { prompt } = req.body;
  const plan = req.plan;
  
  const content = await generateContent(prompt);
  const creationData = {user_id: userId,prompt,content,type: "blog-title"};
  const data = await Creation.create(creationData);
  console.log('Inserted into DB successfully')
  
  const free_usage = req.free_usage;
  if (plan !== "premium") {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});

const generateImages = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const { prompt,publish } = req.body;
  
  const content = await generateImage(prompt);
  const creationData = {user_id: userId,prompt,content,type: "image",publish};
  const data = await Creation.create(creationData);
  console.log('Inserted into DB successfully')

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data,
  });
});

const removeBackground = asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const { image } = req.file;
  
  const content = await removeBg(image);
  const creationData = {user_id: userId,prompt:"Remove background from image",content,type: "image"};
  const data = await Creation.create(creationData);
  console.log('Inserted into DB successfully')

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data, 
  });
});

const removeObjects= asyncErrorHandler(async (req, res) => {
  const { userId } = req.auth();
  const {object} =req.body
  const { image } = req.file;
  
  const content = await removeObject(image,object);
  const creationData = {user_id: userId,prompt:`Remove ${object} from Image`,content,type: "image"};
  const data = await Creation.create(creationData);
  console.log('Inserted into DB successfully')

  res.status(STATUS_CODES.SUCCESS).json({
    statusCode: STATUS_CODES.SUCCESS,
    message: TEXTS.CREATED,
    data: data, 
  });
});



module.exports = {
  generateArticle,
  generateBlogTitles,
  generateImages,
  removeBackground,
  removeObjects
};
