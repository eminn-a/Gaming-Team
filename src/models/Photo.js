const mongoose = require("mongoose");

const photoSchema = {
  name: {
    type: String,
    required: [true, "All fields are required"],
    minLength: [2, "Need should be atleast 2 "],
  },
  image: {
    type: String,
    required: [true, "All fields are required"],
    match: [/^https?:\/\//, "invalid URL"],
  },
  age: {
    type: Number,
    required: [true, "All fields are required-age"],
    min: 1,
    max: 100,
  },
  description: {
    type: String,
    required: [true, "All fields are required-descr"],
    minLength: 5,
    maxLength: 50,
  },
  location: {
    type: String,
    required: [true, "All fields are required-location"],
    minLength: 5,
    maxLength: 50,
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
        // required: true,
      },
    },
  ],
};

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
