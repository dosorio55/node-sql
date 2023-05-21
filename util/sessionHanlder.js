import User from "../models/user.model.js";

const handleLogin = async (req, res, next) => {
  if (req.session.isLoggedin) {
    // const user = await User.findById(req.session.userId)
    req.user = await User.findById(req.session.user._id);
    // req.user = await User.findById(req.session.userId).exec();
    // req.user = await req.session.user;
    next();
  } else {
    return res.send({
      message: `please login before trying to access to the information`,
    });
  }
};

export default handleLogin;
