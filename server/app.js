require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { clerkMiddleware,requireAuth } =require('@clerk/express')
// const { unless } = require("express-unless");
const routes = require("./routes");
// const { authenticateRoutes } = require("./config/unlessRoutes");
// const { authenticate } = require("./middlewares/auth.middleware");
const CustomError = require("./utils/CustomError");
const globalErrorHandler = require("./controllers/error/errorController");
const connectCloudinary=require('./config/cloudinary')


const app = express();

connectCloudinary()
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: false }));
app.use(clerkMiddleware())


app.get("/test",(req,res)=>{
  res.send("Server is running changes")
})

app.use(requireAuth())

const {upload}= require('./utils/multer');

const {uploadFile} = require('./utils/aws')

// authenticate.unless = unless;
// app.use(authenticate.unless(authenticateRoutes));

app.use(require('./middlewares/paginate').paginate)

app.use(routes);



app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
