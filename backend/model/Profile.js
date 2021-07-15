const mongoose = require('mongoose');
const {Schema}=mongoose;
const profileinfo= new Schema ({
    FirstName :{
        type: String,
        required: true,
    },
    
    LastName :{
        type: String,
        required: true,
    },
   
    Email :{
        type: String,
        required: true,
    },
    Password :{
        type: String,
        required: true,
    }
    
});
module.exports = mongoose.model(
    "Profile",
    profileinfo
  );