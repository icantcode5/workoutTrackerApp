const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
  username: {
    type : String,
    unique : true
  }, 
  email: {
    type: String,
    unique : true
  },
  password : {
    type : String
  }
})

module.exports = mongoose.model("User", UserSchema)