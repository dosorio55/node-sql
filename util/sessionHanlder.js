import User from "../models/user.model.js";

const handleLogin = async (req, res, next) => {
  if (req.session.isLoggedin) {
    req.user = await User.findById(req.session.user._id);
    next();
  } else {
    return res.send({
      message: `please login before trying to access to the information`,
    });
  }
};

export default handleLogin;
