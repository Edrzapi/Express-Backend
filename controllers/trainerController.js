const trainerModel = require("../models/trainerModel");
const courseModel = require("../models/courseModel");
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");
const typeId = mongoose.Types.ObjectId;


//read
const readTrainer = asyncHandler(async (req, res, next) => {
  try {
    data = await trainerModel.find().populate('comprehension').exec();
    
    if (!data || data == "") {
      throw new Error();
    }

    return res.status(200).json({ status: 200, data });
  }
  catch (err) {
    res.status(404).json({ status: 404, message: "No trainers found" });
    err.statusCode = 404;
    err.message = "404, not found.";
    return next(err);
  }
});

//read/:id
const readTrainerById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next({ status: 400, msg: 'Missing id parameter' });
  const data = await trainerModel.findById(id);
  if (!(data)) return next({ status: 404, msg: `No trainer found with id: ${id}` });
  return res.status(200).json(data);
});

//post
const postTrainer = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body) throw new Error("Missing field");
    const courseCode = req.body.comprehension.courseCode;
    if (!(await courseModel.exists({ courseCode: courseCode }))) return res.status(400).json({ status: 400, message: "Course code not found" });
    const comp = await comprehensionModel.findByCourseCode(courseCode);
    const trainer = await trainerModel.create({
      trainerName: req.body.trainerName,
      employeeId: req.body.employeeId,
      comprehensions: req.body.comprehension
    });
    res.status(201).json(trainer);
  }
  catch (err) {
    res.status(400).json({ status: 400, message: "Bad request" });
    err.statusCode = 400;
    err.message = "400, bad request.";
    return next(err);
  }
});

//del/:id
const delTrainer = asyncHandler(async (req, res) => {
  const data = await trainerModel.findById(req.params.id);
  if (!data) {
    res.status(400);
    throw new Error('trainer not found ');
  }
  const deleted = await trainerModel.findByIdAndDelete(req.params.id);
  return res.status(204).json(deleted);

});

const putTrainer = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next({ status: 400, message: 'Missing id parameter' });
  if (id.toString().length < 24) return res.status(400).json({ status: 400, message: `Your id parameter is inconsistent with the schema, use a 24 character string.` });
  if (!(await trainerModel.exists({ _id: id }))) return res.status(400).json({ status: 400, message: `No trainer found with id ${id}` });
  try {
    const updated = await trainerModel.findByIdAndUpdate(id, req.query, {
      returnDocument: 'after',
    });
    return res.json(updated);
  } catch (err) {
    res.status(400).json({ status: 400, message: "Bad request" });
    err.statusCode = 400;
    err.message = "400, bad request.";
    return next(err);
  }
});




module.exports = {
  readTrainer,
  readTrainerById,
  postTrainer,
  delTrainer,
  putTrainer,


}