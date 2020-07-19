const { Router } = require("express");
const router = Router();

const Board = require("../models/Board");
const Company = require("../models/Company");
const { veryToken } = require("../utils/auth");

// Get single board
router.get("/get-board/:companyName/:boardName", async (req, res) => {
  const { companyName, boardName } = req.params;

  try {
    const company = await Company.findOne({ companyName });
    const boards = await Board.find({ company: company._id });
    const board = boards.filter(board => board.title === boardName)[0];
    if (!board) {
      res.status(404).json('Board not found!');
    } else {
      res.status(200).json(board)
    }
  } catch(error) {
    console.log(error)
    res.status(400).json(error);
  }
});

// Get my boards
router.get("/get-boards", veryToken, async (req, res) => {
  const { user } = req;

  try {
    const company = await Company.findOne({ companyName: user.company });
    const boards = await Board.find({ company: company._id });
    const objectsArray = boards.map(doc => doc.toObject())
    const updated = objectsArray.map(obj => ({ ...obj, companyName: user.company }))
    res.status(200).json(updated);
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