require("dotenv").config();
require("./db/mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const userRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const methodOverride = require("method-override");

app.set("view engine", "hbs");
app.set("views", "src/templates/views");
hbs.registerPartials("src/templates/partials");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

app.use(express.static("src/public"));

app.use("/user", userRouter);
app.use("/", indexRouter);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log("server listening on port " + port);
});

