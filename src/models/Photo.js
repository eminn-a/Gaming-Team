const mongoose = require("mongoose");

const photoSchema = {
  name: {
    type: String,
    required: [true, "All fields are required"],
  },
  image: {
    type: String,
    required: [true, "All fields are required"],
  },
  age: {
    type: Number,
    required: [true, "All fields are required-age"],
  },
  description: {
    type: String,
    required: [true, "All fields are required-descr"],
  },
  location: {
    type: String,
    required: [true, "All fields are required-location"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      user: String,
      message: {
        type: String,
        required: true,
      },
    },
  ],
};

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
