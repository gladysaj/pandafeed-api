const { Router } = require("express");
const router = Router();

const Board = require("../models/Board");
const Company = require("../models/Company");
const { veryToken } = require("../utils/auth");

// Get my boards
router.get("/get-boards", veryToken, async (req, res) => {
  const { user } = req;

  try {
    const company = await Company.findOne({ companyName: user.company });
    const boards = await Board.find({ company: company._id });
    console.log(boards);
    res.status(200).json(boards);
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
})

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