const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Info = require("../models/info");

router.get("/", auth, async (req, res) => {
  try {
    const collegeInfo = await Info.findOne({ owner: req.user.id });

    res.render("collegeInfo", { loggedIn: true, collegeInfo });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.put("/update", auth, async (req, res) => {
  try {
    let info = await Info.findOne({ owner: req.user.id });
    if (!info) info = new Info({ ...req.body, owner: req.user.id });
    else {
      for (let data in req.body) {
        info[data] = req.body[data];
      }
    }

    await info.save();

    res.redirect("/info");
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

module.exports = router;
