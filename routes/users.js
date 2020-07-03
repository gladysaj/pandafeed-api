const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post('/signup', (req, res) => {
  const { password, }
});

module.exports = router;
