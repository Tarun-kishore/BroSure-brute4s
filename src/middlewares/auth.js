const { get } = require("http");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Token = require("../models/tokens");

const auth = async (req, res, next) => {
  try {
    if (!req.cookies.token) return res.redirect("/login");
    const decoded = await jwt.verify(req.cookies.token, process.env.SECRET);

    const token = await Token.findOne({
      user: decoded._id,
      token: req.cookies.token,
    });

    if (!token) {
      return res.clearCookie("token").redirect("/login");
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.clearCookie("token");
    }
    req.user = user;
    req.token = req.cookies.token;
    next();
  } catch (e) {
    res.send(e);
  }
};

module.exports = auth;

