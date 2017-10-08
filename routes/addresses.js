var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET all address listing. */
router.get('/', (req, res, next) => {
  models.Address.findAll().then((addresses) => {
    res.send(addresses);
  }, (e) => {
    res.send(e);
  });
});

/* POST new user. */
router.post('/', (req, res) => {
  models.Address.create({
    street: req.body.street.trim(),
    state: req.body.state.trim(),
    city: req.body.city.trim(),
    zip: req.body.zip
  })
  .then(() => res.send("Address created successfully"), (e) => {
    res.send(e);
  })
});


module.exports = router;
