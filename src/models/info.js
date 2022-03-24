const mongoose = require("mongoose");

const infoSchema = mongoose.Schema(
  {
    university: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    courses: [
      {
        courseName: {
          type: String,
          required: true,
        },
        numberOfSeats: {
          type: Number,
          required: true,
        },
        maxPackage: {
          type: mongoose.Types.Decimal128,
          required: true,
        },
        averagePackage: {
          type: mongoose.Types.Decimal128,
          required: true,
        },
        placementPercent: {
          type: mongoose.Types.Decimal128,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Info = mongoose.model("Info", infoSchema);
module.exports = Info;
