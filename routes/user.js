const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Company = require("../models/Company");

const getCompanyUrl = (company) => {
  return company.toLowerCase().trim().split(' ').join('-');
}

router.post("/signup", async (req, res) => {
  const { password, ...userValues } = req.body;

  const foundEmail = await User.find({ email: userValues.email }).count();
  const foundCompany = await Company.find({ companyName: getCompanyUrl(userValues.company) }).count();

  if (foundEmail >= 1) {
    return res.status(401).json({ message: "Email is already in use" });
  }
  if (foundCompany >= 1) {
    return res.status(401).json({ message: "Company is already in use" });
  }

  bcrypt.hash(password, 10).then((hashedPass) => {
    const user = { ...userValues, password: hashedPass };
    const company = getCompanyUrl(userValues.company);

    User.create({ ...user, company })
      .then((response) => {
        Company.create({ companyName: response.company, user: response._id }).then(() => {
          res.status(200).json({ message: "User has been created" });
        }).catch(err => res.status(400).json(err));
      }).catch((err) => res.status(400).json(err));
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email or password not sent" });

  User.findOne({ email }).then((user) => {
    if (user === null)
      return res.status(404).json({ message: "User is not registered" });

    bcrypt.compare(password, user.password).then((match) => {
      if (match) {
        const userObject = user.toObject();
        const { password, ...userWithoutPass } = userObject;
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: "1d",
        });
        return res
          .cookie("token", token, {
            expires: new Date(Date.now() + 86400000),
            secure: false,
            httpOnly: true,
          })
          .json({ user: userWithoutPass });
      }
      return res.status(400).json({ message: "Invalid password" });
    });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout" });
});

module.exports = router;
