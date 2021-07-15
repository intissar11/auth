const Profile = require("../model/Profile");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

const register = async(req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;
  try {

    const existeProfile = await Profile.findOne({ Email });
    if (existeProfile) {
      return res.status(400).json([{ msg: "Profile exist !" }]);
    }

    const profile = await new Profile({ FirstName, LastName, Email, Password });
    const salt = await bcrypt.genSalt(saltRounds);
    profile.Password = await bcrypt.hash(Password, salt);
    await profile.save();
    const payload = {
      profileID: profile._id,
    };
    var token = jwt.sign(payload, process.env.SECRET);

    res.send({
      token,
      profile: {
        FirstName: profile.FirstName,
        LastName: profile.LastName,
        Email: profile.Email,
        Password: profile.Password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const login=async(req,res)=>{
    const {Email,Password}=req.body;
    try {
        const profile = await Profile.findOne({ Email });
    if (!profile) {
      return res.status(400).json([{ msg: "you should register first!" }]);
    }
    const match = await bcrypt.compare(Password, profile.Password);
    if (!match) {
        return res.status(400).json([{ msg: "bad credential" }]);
      }
      const payload = {
        profileID: profile._id,
      };
      var token = jwt.sign(payload, process.env.SECRET);
  
      res.send({
        token,
        profile: {
          FirstName: profile.FirstName,
          LastName: profile.LastName,
          Email: profile.Email,
          Password: profile.Password,
        },
      });
    
    } catch (error) {
       console.error(error); 
    }
}

const getAuth=(req,res)=>{
    res.send(req.profile)
    }
module.exports = { register ,login,getAuth};
