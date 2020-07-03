const { Router } = require("express");
const router = Router();

const Board =  require("../models/Board");

router.get("/", (req, res) => {
    Board.find()
    .then((result) => {
      res.status(200).json({ results });
    })
    .catch(err => res.status(400).json(err));
});