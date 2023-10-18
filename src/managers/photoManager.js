const Photo = require("../models/Photo");

exports.create = async (photoData) => {
  return await Photo.create(photoData);
};

exports.getAll = async () => await Photo.find().populate("owner").lean();

exports.getOne = async (id) =>
  await Photo.findById(id).populate("owner").lean();

exports.delete = (id) => Photo.findByIdAndDelete(id);

exports.update = (id, data) => Photo.findByIdAndUpdate(id, data);

exports.addComment = async (petId, commentData) => {
  const pet = await Photo.findById(petId);
  pet.comments.push(commentData);
  return pet.save();
};

exports.getByOwner = (id) => Photo.find({ owner: id }).lean();
