const trainerModel = require("../models/trainerModel");
const courseModel = require("../models/courseModel");
const comprehensionModel = require("../models/comprehensionModel");
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose")
const typeId = mongoose.Types.ObjectId;


//read
const readTrainer = asyncHandler(async (req, res, next) => {
  try {
    trainer = await trainerModel.find();
    if (!trainer || trainer == "") {
      throw new Error;
    }
    return res.status(200).json({status: 200, trainer});

  }
  catch (err) {
    res.status(404).json({status: 404, message: "No trainers found"});
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
const postTrainer = asyncHandler(async (req, res) => {
 try {
  if (!req.body) {
    res.status(400);
    throw new Error('Please check the syntax, and try again.');
  }
  const compLists = await comprehensionModel.find(req.body.abilities);
  const courseList = await courseModel.findByCourseCode(req.body.abilites.courseCode);
  
  if(compLists.abilities.courseName != courseList.courses) return next({ status: 404, msg: `Please check the courses input, this trainer appears to be missing that course.`});

  const trainer = await trainerModel.create({
    trainerName: req.body.trainerName,
    employeeId: req.body.employeeId,
    abilities: list
  });
  res.status(201).json(trainer);
}
catch (err) {
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
  if (!id) return next({ status: 400, msg: 'Missing id parameter' });
  if (!(await trainerModel.exists({ _id: id }))) return next({ status: 404, msg: `No trainer found with id ${id}` });
  try {
    const updated = await trainerModel.findByIdAndUpdate(id, req.query, {
      returnDocument: 'after',
    });
    return res.json(updated);
  } catch (err) {
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