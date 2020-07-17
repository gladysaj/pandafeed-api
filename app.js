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

mongoose
 .connect(process.env.DB, {
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

app.use(cors({ origin: 'http://localhost:4444', credentials: true }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const usersRouter = require('./routes/user');
const companyRouter = require('./routes/company');
const changelogRouter = require('./routes/changelog');
const updatesRouter = require('./routes/updates');
app.use('/api/', usersRouter);
app.use('/api/', companyRouter);
app.use('/api/', changelogRouter);
app.use('/api/', updatesRouter);

module.exports = app;
