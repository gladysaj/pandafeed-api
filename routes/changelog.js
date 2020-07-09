const { Router } = require("express");
const router = Router();
const { veryToken } = require("../utils/auth");

const Changelog =  require("../models/Changelog");

// Get my changelog board
router.get("/changelog", veryToken, (req, res) => {
  const { _id: userId } = req.user;
  Changelog.find({ user: { $eq: userId } })
    .then((company) => {
      res.status(201).json({ result: company });
    })
    .catch((err) => res.status(400).json(err));
});

// Post in my changelog board
router.post("/changelog-post", veryToken, (req, res) => {
  const company = { ...req.body};
  Changelog.create(company)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
