const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require('mongoose');
const config = require("./utils/config");
const logger = require("./utils/logger");

logger.info(`trying to connect to url: ${config.MONGODB_URL}`);

const MONGODB_URL = config.MONGODB_URL;

mongoose
    .connect(MONGODB_URL)
    .then(() => logger.info("connected to mongodb"))
    .catch(error => { logger.error(error); });    

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
