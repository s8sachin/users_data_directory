var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET all users listing. */
router.get('/', (req, res, next) => {
  models.User.findAll().then((users) => {
    res.send(users);
  }, (e) => {
    res.send(e);
  });
});

/* POST new user. */
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

/* GET one user by id. */
router.get('/:id', (req, res, next) => {
  models.User.findOne({where: {id: req.params.id}})
  .then((user) => {
    res.send(user);
  }, (e) => {
    res.send(e);
  });
});

/* DELETE one user by id. */
router.delete('/:id', (req, res) => {
  models.User.destroy({ where: {id: req.params.id}})
  .then(() => res.send('User deleted successfully'), (e) => {
    res.send(e);
  });
});

/* GET one user by id. */
router.put('/:id', (req, res) => {
  models.User.find({where: {id: req.params.id}})
  .then((user) => {
    if(!user){
      return res.status(400).send('User not found');
    }
    user.updateAttributes({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then((user) => res.send({
      msg: 'user updated successfully',
      user: user
    }));
  }).catch((e) => res.send(e));
});


module.exports = router;
