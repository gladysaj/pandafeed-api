const { Router } = require("express");
const router = Router();

const Update = require("../models/Update");
const Company = require("../models/Company");
const { veryToken } = require("../utils/auth");

// Create changelog update
router.post("/create-update", veryToken, async (req, res) => {
  const { user } = req;
  const data = { ...req.body };

  try {
    const company = await Company.findOne({ companyName: user.company });
    await Update.create({ ...data, company: company._id });
    res.status(200).json('Update created!');
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;