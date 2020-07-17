const { Router } = require("express");
const router = Router();
const { veryToken } = require("../utils/auth");

const Company = require("../models/Company");

// Get my company
router.get("/my-companies", veryToken, (req, res) => {
  const { _id: userId } = req.user;
  Company.find({ user: { $eq: userId } })
    .then((company) => {
      res.status(201).json({ result: company });
    })
    .catch((err) => res.status(400).json(err));
});

// Create your company if you have a user
router.post("/create-company", veryToken, (req, res) => {
  const { _id: userId } = req.user;
  const company = { ...req.body };
  Company.create({ ...company, user: userId })
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Delete your company
router.get("/delete-company/:id", veryToken, (req, res) => {
  const { _id: userId } = req.user
  const { id } = req.params;
      Company.findOneAndDelete({ _id: id, user: userId })
        .then((company) => {
          res.status(200).json({
            result: company,
          });
        }).catch((err) => res.status(400).json(err));
});

// Modify your company
router.patch("/modify-company/:id", veryToken, (req, res) => {
  const { _id: userId } = req.user
  const { id } = req.params;
      Company.findOneAndUpdate({ _id: id, user: userId })
      .then((company) => {
        res.status(200).json({
          result: company,
        });
    }).catch((err) => res.status(400).json(err));
});

module.exports = router;



