'use strict';
var bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    passwordHash: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Address, {
      foreignKey: 'UserId'
    });
  }

  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.passwordHash, 10)
    .then(hash => {
      user.passwordHash = hash;
    })
    .catch(err => { 
      throw new Error(); 
    });
  });

  return User;
};