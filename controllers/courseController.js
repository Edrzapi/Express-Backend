const trainerModel = require("../models/trainerModel");
const courseModel = require("../models/courseModel");
const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");

//read/:id
const readCourseById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next({ status: 400, msg: 'Missing id parameter' });
  const data = await courseModel.findById(id);
  if (!(data)) return next({ status: 404, msg: `No course found with id: ${id}` });
  return res.status(200).json(data);
});

//read/:name
const readByCourseName = asyncHandler(async (req, res, next) => {
  const courseName = req.params.name.toUpperCase();
  try {
    const data = await courseModel.findByCourseCode(courseName);
    if (!data || data.length === 0) {
      throw new Error();
    }
    return res.status(200).json({ status: 200, data });
  } catch (err) {
    res.status(404).json({ status: 404, message: "No courses found" });
    err.statusCode = 404;
    err.message = "404, not found.";
    return next(err);
  }
});

// read
const readCourse = asyncHandler(async (req, res, next) => {
  try {
    const data = await courseModel.find().populate('trainers').exec();
    if (!data || data.length === 0) {
      throw new Error();
    }
    return res.status(200).json({ status: 200, data });
  } catch (err) {
    res.status(404).json({ status: 404, message: "No courses found" });
    err.statusCode = 404;
    err.message = "404, not found.";
    return next(err);
  }
});

//post
const postCourse = asyncHandler(async (req, res, next) => {
  try {
    if (await courseModel.exists({ courseCode: req.body.courseCode })) {
      return res.status(400).json({ status: 400, message: "That course already exists" });
    }
    const course = await courseModel.create({
      courseCode: req.body.courseCode.toUpperCase(),
      courseTitle: req.body.courseTitle,
      parentProgramme: req.body.parentProgramme,
      courseOwner: req.body.courseOwner,
      duration: req.body.duration,
      currentVersion: req.body.currentVersion,
      courseOutline: req.body.courseOutline,
      outlineQa: req.body.outlineQa,
      assetLinks: req.body.assetLinks,
      disicplineTags: req.body.disicplineTags,
      trainers: req.body.trainers
    });
    return res.status(200).json({ status: 200, course });
  } catch (err) {
    res.status(400).json({ status: 400, message: "Bad request" });
    return next(err);
  }
});

//del/:id
const delCourse = asyncHandler(async (req, res) => {
  const data = await courseModel.findById(req.params.id);
  if (!data) {
    res.status(400);
    throw new Error('Course not found');
  }
  const deleted = await courseModel.findByIdAndDelete(req.params.id);
  return res.status(204).json(deleted);
});

//del/:name
const delCourseByName = asyncHandler(async (req, res) => {
  const courseName = req.params.name.toUpperCase();
  try {
    const data = await courseModel.findByCourseCode(courseName);
    if (!data || data.length === 0) {
      throw new Error();
    }
    const deleted = await courseModel.deleteOne({ courseCode: courseName });
    return res.status(204).json(deleted);
  } catch (err) {
    res.status(404).json({ status: 404, message: "No courses found" });
    err.statusCode = 404;
    err.message = "404, not found.";
    return next(err);
  }
});

//update/:id
const putCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next({ status: 400, msg: 'Missing id parameter' });
  if (!(await courseModel.exists({ _id: id }))) return next({ status: 404, msg: `No course found with id ${id}` });
  try {
    const updated = await courseModel.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
    });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

module.exports = {
  readCourse,
  readCourseById,
  postCourse,
  delCourse,
  delCourseByName,
  putCourse,
  readByCourseName
};
