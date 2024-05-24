const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true},
    courseTitle: { type: String, required: true },
    parentProgramme: { type: String, required: false },
    duration: { type: Number, required: true },
    currentVersion: { type: Number, required: true },
    assetLinks: {type: [String]},
    disicplineTags: {type: [String]},
    trainers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trainer',
        required : false
    }]
},
{
    statics : {
        findByCourseCode: async function(name) { 
            return await this.find({ courseCode: name });
        }
    }
});



module.exports = mongoose.model('course', courseSchema);
