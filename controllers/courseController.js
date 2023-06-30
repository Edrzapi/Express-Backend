const courseModel = require("../models/courseModel");
const asyncHandler = require('express-async-handler')
//read
const readCourse = asyncHandler(async (req, res) => {
    data = await courseModel.find();
    if (!data || data == "") {
      res.status(404);
      throw new Error(`No courses found `);
    }
    return res.status(200).json(data);
});
//read/:id
const readCourseById = asyncHandler (async (req, res, next) => {
    const { id } = req.params;
    if (!id) return next({ status: 400, msg: 'Missing id parameter' });
    const data = await courseModel.findById(id);
    if (!(data)) return next({ status: 404, msg: `No course found with id: ${id}` });
    return res.status(200).json(data);
    
  });
//read/:name
const readByCourseName = asyncHandler(async (req, res, next) => {
    const courseName = req.params.name;
    const data = await courseModel.findByCourseCode(courseName);
    if (!data || data == "") {
        res.status(400);
        throw new Error(`course with name: ${courseName} not found `);
      }
    return res.status(200).json(data);     
    });

    const readWithTrainers = asyncHandler(async (req, res) => {
      try { data = await courseModel.find().populate('trainer', 'trainerName').exec();
       if (!data || data == "") {
         throw new Error(`404, No courses found `);
       }
       return res.status(200).json(data);
     } 
     catch (err) {
       res.status(404).json({status: 404, message: "No courses found"});
       return next(err);
     }
     });

//post
const postCourse = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error('Invalid syntax, please try again..');
    }

    const course = await courseModel.create({
        courseCode: req.body.courseCode,
        courseTitle: req.body.courseTitle,
        parentProgramme: req.body.parentProgramme,
        courseOwner: req.body.courseOwner,
        duration: req.body.duration,
        currentVersion: req.body.currentVersion,
        courseOutline: req.body.courseOutline,
        outlineQa: req.body.outlineQa,
        assetLinks: req.body.assetLinks,
        disicplineTags: req.body.disicplineTags
       
    });

    res.status(200).json(course);
});
      
//del/:id
const delCourse = asyncHandler(async (req, res) => {
    const data = await courseModel.findById(req.params.id);
    if (!data) {
        res.status(400);
        throw new Error('Course not found ');
      }
      const deleted = await courseModel.findByIdAndDelete(req.params.id);
      return res.status(204).json(deleted);
      
});

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
    putCourse,
    readByCourseName,
    readWithTrainers
}