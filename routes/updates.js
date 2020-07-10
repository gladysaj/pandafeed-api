const { Router } = require("express");
const router = Router();
const { veryToken } = require("../utils/auth");
const Changelog = require('../models/Changelog')
const Updates = require("../models/Updates");

// Get my updates
router.get("/updates/:id_changelog", veryToken, (req, res) => {
  const { _id: userId } = req.user;
  const {id_changelog} = req.params

  Updates.find({ changelog:id_changelog })
    .then((company) => {
      res.status(201).json({ result: company });
    })
    .catch((err) => res.status(400).json(err));
});

// Post in my changelog board
router.post("/updates-post", veryToken, (req, res) => {
  const { _id: userId } = req.user;
  const company = { ...req.body};
  Changelog.findOne({_id:company.changelog,user:userId}).then(product=>{
    let {version} = product
      if(company.version_update > version){
        //si la version que mando es superior ccreo un nuevo post de versiones
        Updates.create(company)
        .then((result) => {
          res.status(200).json({ result });
        })
        .catch((err) => res.status(400).json(err));
       // Encontrar mi producto y modificarlo
       Changelog.findByIdAndUpdate(product._id, {...product, version: company.version_update},{ new: true })
       .then(res=>{}).catch(err=>{})
      }else{
      
        res.status(400).json({msg:'Debes colocar una version superior'})
      }

  }).catch((err) => res.status(400).json(err));
 
});