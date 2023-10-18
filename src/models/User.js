const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Need username"],
    unique: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: [true, "Need email"],
    minLength: 10,
  },
  password: {
    type: String,
    required: [true, "Need password"],
    minLength: 4,
  },
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
});

userSchema.virtual("repeatPassword").set(function (value) {
  if (this.password !== value) {
    throw new Error("Password missmatch!");
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
