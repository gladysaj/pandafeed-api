const { Router } = require("express");
const router = Router();
const Company = require("../models/Company");
const { veryToken } = require("../utils/auth");

// Get my company
router.get("/my-company", veryToken, (req, res) => {
  const { _id: userId } = req.user;
  Company.find({ user: { $eq: userId } })
    .then((company) => {
      res.status(201).json({ result: company });
    })
    .catch((err) => res.status(400).json(err));
});

// Post a company if you are authorized
router.post("/company", veryToken, (req, res) => {
  const company = { ...req.body};
  Company.create(company)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => res.status(400).json(err));
});

// Delete your company
router.delete("/delete-company", veryToken, (req, res) => {
  const { id } = req.body;

  Company.findById(id).then((company) => {
    if (company.user.equals(req.user._id)) {
      Company.findOneAndDelete(id)
        .then((company) => {
          res.status(200).json({
            result: company,
          });
        }).catch((err) => res.status(400).json(err));
    } else {
      res.status(401).json({ error: 'You are not allowed to remove this company' });
    }
  }).catch(() => res.status(400).json({ error: 'Company not found!' }));
});

// Modify your company
router.patch("/modify-company", veryToken, (req, res) => {
  const { id } = req.body;

  Company.findById(id).then((company) => {
    if (company.user.equals(req.user._id)) {
      Company.findOneAndUpdate(id)
      .then((company) => {
        res.status(200).json({
          result: company,
        });
    }).catch((err) => res.status(400).json(err));
  } else {
    res.status(401).json({ error: 'You are not allowed to modify this company' });
  }
}).catch(() => res.status(400).json({ error: 'Company not found!' }));
});

module.exports = router;
