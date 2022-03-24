const mongoose = require("mongoose");

const infoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Info = mongoose.model("Info", infoSchema);
module.exports = Info;

