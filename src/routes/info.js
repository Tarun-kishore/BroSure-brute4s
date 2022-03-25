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

router.post("/all", async (req, res) => {
  try {
    const info = await Info.find()
      .limit(req.body.limit)
      .skip(req.body.skip)
      .exec();

    for (let i = 0, len = info.length; i < len; i++) {
      info[i] = info[i].getLessInfo();
    }

    res.send(info);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get("/view/:id", async (req, res) => {
  let loggedIn;
  if (req.cookies.token) loggedIn = true;

  try {
    const collegeInfo = await Info.findById(req.params.id);

    if (!collegeInfo) {
      return res.render("404", { loggedIn });
    }

    res.render("view", { loggedIn, collegeInfo });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
