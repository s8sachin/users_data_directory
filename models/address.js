'use strict';
module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define('Address', {
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER
  });

  Address.associate = function(models){
    Address.belongsTo(models.User, {
      onDelete: 'CASCADE', 
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Address;
};