const mongoose = require("mongoose");

const viewerModel = new mongoose.Schema({
    courseCode:  { type: String, required: [true, 'Enter course code'] },
    confidence   : { type: String, required: false },
    competence   : { type: String, required: false },
    context      : { type: String, required: false },
    certification: { type: Boolean, required:false },
    
},
{    statics : {
    },
    timestamps: true,
    toJSON: {virtuals: true}
    
});



module.exports = mongoose.model('comprehension', viewerModel);
