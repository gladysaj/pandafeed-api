const { Router } = require("express");
const router = Router();

const Board = require("../models/Board");
const Company = require("../models/Company");
const { veryToken } = require("../utils/auth");

// Create board
router.post("/create-board", veryToken, async (req, res) => {
  const { user } = req;
  const data = { ...req.body };

  try {
    const company = await Company.findOne({ companyName: user.company });
    await Board.create({ ...data, company: company._id });
    res.status(200).json('Board created!');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;