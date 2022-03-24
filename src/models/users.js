const mongoose = require("mongoose");
const Token = require("./tokens");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("info", {
  ref: "Info",
  localField: "_id",
  foreignField: "owner",
});

userSchema.statics.getUserByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid email or password");

  return user;
};

userSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.SECRET, {
    expiresIn: "24h",
  });

  const tokenData = new Token({ user: user._id, token });

  await tokenData.save();

  await user.save();

  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

