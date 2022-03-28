const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const Token = require("../models/tokens");
const monthTime = 30 * 24 * 60 * 60 * 1000;

//user session management
router.post("/signup", async (req, res) => {
  delete req.body.confirmPassword;
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    return res
      .cookie("token", token, {
        httpOnly: true,
        expire: new Date() + monthTime,
      })
      .status(200)
      .redirect("/");
  } catch (e) {
    res.send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.getUserByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    return res
      .cookie("token", token, {
        httpOnly: true,
        expire: new Date() + monthTime,
      })
      .status(200)
      .redirect("/");
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    await Token.findOneAndDelete({ token: req.token, user: req.user._id });

    res.clearCookie("token").redirect("/");
  } catch (e) {
    res.send(e);
  }
});

//profile management
router.post("/update", auth, (req, res) => {
  const data = { loggedIn: true, ...req.user.getPublicProfile() };
  res.render("updateProfile", data);
});

router.post("/change", auth, (req, res) => {
  const data = { loggedIn: true };
  res.render("changePassword", data);
});

router.post("/exist", async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (user) {
      return res.status(200).send({ exist: true });
    }
    res.status(200).send({ exist: false });
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/profile", auth, (req, res) => {
  try {
    const data = { loggedIn: true, ...req.user.getPublicProfile() };
    res.render("profile", data);
  } catch (error) {
    res.status(400).send();
  }
});

//update and deletion in profile
router.put("/update", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  updates.forEach((update) => (req.user[update] = req.body[update]));
  try {
    await req.user.save();
    res.redirect("/success");
  } catch (e) {
    res.send(e);
  }
});

router.put("/change", auth, async (req, res) => {
  try {
    isMatch = await bcrypt.compare(req.body.oldPassword, req.user.password);
    if (!isMatch)
      return res.render("changePassword", {
        error: "Wrong Old Password",
        loggedIn: true,
      });
    req.user.password = req.body.password;
    await req.user.save();
    res.redirect("/success");
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.clearCookie("token").send("deleted");
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
