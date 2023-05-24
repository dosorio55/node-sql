import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    const newUser = await user.save();

    return res.send({ message: `correctly saved ${newUser}` });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findOne({ name, email });

    if (user) {
      req.session.isLoggedin = true;
      req.session.user = user;
      req.session.save(() => {
        return res.status(200).json("correctamente loggeado");
        // res.redirect('/');
      });
      // return res.send({ message: `logged in correctly`, user });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    if (req.session.isLoggedin) {
      req.session.destroy((error) => {
        if (error) throw error;
      });
      return res.send({ message: `logged out correctly` });
    } else {
      throw "Database error";
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
};
