
const jwt=require("jsonwebtoken");
const Profile = require("../model/Profile");
const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );
    const profile = await Profile.findById(
      decoded.profileID
    ).select("-password");
    if (!profile) {
      return res
        .status(401)
        .json([{ msg: "unauthorized user" }]);
    } else {
      req.profile = profile;
      next();
    }
  } catch (error) {
    res.status(401).json([{ msg: "unauthorized" }]);
  }
};
module.exports = isAuth;