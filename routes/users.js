var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  models.User.findAll().then((users) => {
    res.send(users);
  })
});

router.post('/', (req, res) => {
  models.User.create({
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim()
  })
  .then(() => res.send("User created successfully"), (e) => {
    res.send(e);
  })
});

module.exports = router;
