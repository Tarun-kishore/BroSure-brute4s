const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  const options = {};

  if (req.cookies.token) options.loggedIn = true;
  res.render("about", options);
});

router.get("/search", (req, res) => {
  const options = {};

  if (req.cookies.token) options.loggedIn = true;
  res.render("search", options);
});

router.get("/success", (req, res) => {
  const options = {};

  if (req.cookies.token) options.loggedIn = true;
  options.message = "The process completed succesfully";

  res.render("success", options);
});

router.get("/login", (req, res) => {
  const options = {};

  if (req.cookies.token) options.loggedIn = true;
  res.render("login", options);
});

router.get("/signup", (req, res) => {
  const options = {};

  if (req.cookies.tokenr) options.loggedIn = true;
  res.render("signup", options);
});

router.get("/", (req, res) => {
  const options = {};

  if (req.cookies.token) options.loggedIn = true;
  res.render("index", options);
});

module.exports = router;
