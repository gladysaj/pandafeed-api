const { Router } = require("express");
const router = Router();

const Changelog =  require("../models/Changelog");

router.get("/", (req, res) => {
  Changelog.find()
    .then((result) => {
      res.status(200).json({ results });
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
