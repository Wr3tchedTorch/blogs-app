const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const mongoose = require('mongoose');
const config = require("./utils/config");
const logger = require("./utils/logger");
const errorHandler = require("./utils/middleware");

logger.info(`trying to connect to url: ${config.MONGODB_URL}`);

const MONGODB_URL = config.MONGODB_URL;

mongoose
    .connect(MONGODB_URL)
    .then(() => logger.info("connected to mongodb"))
    .catch(error => { logger.error(error); });    

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use(errorHandler);

module.exports = app;
