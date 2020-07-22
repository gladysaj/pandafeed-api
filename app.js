// Dotenv config
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Config cors
const cors = require("cors");

// Config mongoose
const mongoose = require("mongoose");

const db = process.env.DB || 'mongodb://localhost/panda-api';

mongoose
 .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
 })
 .then((x) => {
     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
 })
 .catch((err) => {
     console.error("Error connecting to mongo", err);
 });

const app = express();

app.use(cors({ origin: ['http://localhost:4444', 'https://pandafeed.netlify.app', 'https://pandafeed.co'], credentials: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/user');
const companyRouter = require('./routes/company');
const changelogRouter = require('./routes/changelog');
const updatesRouter = require('./routes/update');
const boardRouter = require('./routes/board');
const postRouter = require('./routes/post');

app.use('/api/', usersRouter);
app.use('/api/', companyRouter);
app.use('/api/', changelogRouter);
app.use('/api/', updatesRouter);
app.use('/api/', boardRouter);
app.use('/api/', postRouter);

module.exports = app;
