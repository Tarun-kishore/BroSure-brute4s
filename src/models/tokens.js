const mongoose = require("mongoose");

let tokenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    index: {
      expireAfterSeconds: 30 * 24 * 3600,
    },
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
