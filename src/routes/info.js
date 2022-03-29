const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Info = require("../models/info");

router.get("/", auth, async (req, res) => {
  try {
    const collegeInfo = await Info.findOne({ owner: req.user.id });

    res.render("collegeInfo", {
      loggedIn: true,
      collegeInfo: collegeInfo || {},
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.put("/update", auth, async (req, res) => {
  try {
    if (req.body.collegeImage == "") delete req.body.collegeImage;
    let info = await Info.findOne({ owner: req.user.id });
    if (!info) info = new Info({ ...req.body, owner: req.user.id });
    else {
      for (let data in req.body) {
        if (data == "collegeImage") continue;
        info[data] = req.body[data];
      }
    }

    if (req.body.collegeImage != undefined) {
      const img = JSON.parse(req.body.collegeImage);
      info.collegeImage = `data:${img.type};base64,${img.data}`;
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

    //console.log(info[0]);

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

router.post("/search", async (req, res) => {
  const searchQuery = req.body.search.split(" ");
  let regex = `(${searchQuery[0]})`;

  for (let i = 1, len = searchQuery.length; i < len; i++) {
    regex = regex.concat(`|(${searchQuery[i]})`);
  }

  try {
    const colleges = await Info.find({
      $or: [
        {
          university: { $regex: regex, $options: "i" },
        },
        {
          college: { $regex: regex, $options: "i" },
        },
        {
          desc: { $regex: regex, $options: "i" },
        },
      ],
    })
      .limit(req.body.limit)
      .skip(req.body.skip);

    for (let i = 0, len = colleges.length; i < len; i++) {
      colleges[i] = colleges[i].getLessInfo();
    }
    res.send(colleges);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
