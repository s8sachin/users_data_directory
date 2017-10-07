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
  // Fill
});

module.exports = router;
