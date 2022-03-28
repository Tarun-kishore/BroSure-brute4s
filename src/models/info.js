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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    collegeImage: {
      type: Buffer,
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

infoSchema.methods.toJSON = function () {
  if (typeof this.collegeImage != "string") {
    this.collegeImage = `data:png;base64,${this.collegeImage.toString(
      "base64"
    )}`;
  }

  return this;
};

infoSchema.methods.getLessInfo = function () {
  const infoInstance = this.toObject();

  const numberOfCourses = infoInstance.courses.length;

  let maxPackage = 0;
  let totalPackage = 0;
  let totalSeats = 0;

  infoInstance.courses.forEach((course) => {
    if (course.maxPackage > maxPackage) maxPackage = course.maxPackage;
    totalPackage += course.numberOfSeats * course.averagePackage;
    totalSeats += course.numberOfSeats;
  });

  const averagePackage = totalPackage / totalSeats;

  delete infoInstance.courses;
  infoInstance.numberOfCourses = numberOfCourses;
  infoInstance.maxPackage = maxPackage;
  infoInstance.averagePackage = averagePackage;
  infoInstance.totalSeats = totalSeats;

  return infoInstance;
};

const Info = mongoose.model("Info", infoSchema);
module.exports = Info;
