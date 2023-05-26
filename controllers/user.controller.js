import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const createUser = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.send({ message: `email ${email} is already in use` });
    }

    if (password !== confirmPassword) {
      return res.send({ message: `passwords do not match` });
    }

    bcrypt.hash(password, 12, async (error, hashedPassword) => {
      if (error) {
        return res.send({ message: `error hashing password` });
      }

      const newUser = new User({
        email,
        password: hashedPassword,
        cart: { items: [] },
      });
      await newUser.save();
      return res.send({ message: `correctly saved ${newUser.email}` });
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.send({ message: `Invalid credentials` });

    bcrypt.compare(password, user.password, (error, passwordsMatch) => {
      if (error) {
        return res.send({ message: `Internal server error` });
      } else if (passwordsMatch) {
        req.session.isLoggedin = true;
        req.session.user = user;
        req.session.save(() => {
          return res.status(200).json("correctly logged in");
        });
      } else {
        return res.send({ message: `Invalid credentials` });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
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
    next(error);
  }
};

export const resetPasswordToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.send({ message: `email is required` });

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      return res.send({ message: `email is not valid` });
    }

    const user = await User.findOne({ email });

    if (!user) return res.send({ message: `email not found` });

    crypto.randomBytes(32, (error, buffer) => {
      if (error) {
        console.log(error);
        return res.send
          .status(500)
          .json({ message: "An error occurred while processing your request" });
      }

      const token = buffer.toString("hex");
      req.session.resetToken = token;
      req.session.resetTokenExpiration = Date.now() + 3600000;
      req.session.save(() => {
        return res.send({ message: `here is your token ${token}` });
      });
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password, confirmPassword, email } = req.body;

    if (!token) {
      return res.send({ message: `token is required` });
    } else if (req.session.resetToken !== token) {
      return res.send({ message: `token is not valid` });
    } else if (password !== confirmPassword) {
      return res.send({ message: `passwords do not match` });
    }

    if (req.session.resetTokenExpiration < Date.now()) {
      return res.send({ message: `token has expired` });
    }

    const user = await User.findOne({ email });

    if (!user) return res.send({ message: `email not found` });

    const hashedPassword = await bcrypt.hash(password, 12);
    req.session.destroy(async (error) => {
      if (error) throw error;

      user.password = hashedPassword;
      await user.save();
      res.send({ message: `password changed correctly` });
    });
  } catch (error) {
    next(error);
  }
};
