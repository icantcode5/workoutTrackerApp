const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
  name: {
    type : String,
    required : [true, "Please add a username"]
  }, 
  email: {
    type: String,
    unique : true,
    required : [true, "Please add an email"]
  },
  password : {
    type : String,
    required : [true, "Please add a password"]
  }
}, 
{
  //this section automatically creates timestamps when the an instance of this model is createdAt/updatedAt too!
  timestamps: true
})

module.exports = mongoose.model("User", UserSchema)