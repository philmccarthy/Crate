'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    }
    // going to add a user attribute here for their style. Also have to do a migration afterwards. That happens elsewhere, but that file does not exist yet, so I am noting it here.
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}