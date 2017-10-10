var models  = require('../models');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')

/* GET all users listing. */
router.get('/', (req, res, next) => {
  models.User.findAll({
    include: [ models.Address ]
  }).then((users) => {
    res.send(users);
  }, (e) => {
    res.send(e);
  });
});

/* POST new user. */
router.post('/', (req, res) => {
  if(req.body.password.trim() == req.body.password_confirm.trim()) { 
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password.trim(), salt, (err, hash) => {
        console.log(hash);
        models.User.create({
          firstName: req.body.firstName.trim(),
          lastName: req.body.lastName.trim(),
          email: req.body.email.trim(),
          password: hash
        })
        .then(() => res.send({message: "User created successfully", status: 200}), 
          (e) => {
            res.send(e);
          })
      })
    });
  }
  else{
    res.send({error: 'passwords do not match', status: 422})
  }
});

/* GET one user by id. */
router.get('/:id', (req, res, next) => {
  models.User.findOne({where: {id: req.params.id}, 
    include: [ models.Address ]
  })
  .then((user) => {
    res.send(user);
  }).catch((e) => res.send(e));
});

/* DELETE one user by id. */
router.delete('/:id', (req, res) => {
  models.User.destroy({ where: {id: req.params.id}})
  .then(() => res.send('User deleted successfully'), (e) => {
    res.send(e);
  });
});

/* GET one user by id. */


module.exports = router;
