const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    trainerName: { type: String, required: true },
    employeeId: { type: String, required: true, unique:[true, 'Employee ID already found.']  },
    comprehension: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comprehension',
        required : false
    }]

},
{    statics : {
    },
    timestamps: true,
    toJSON: {virtuals: true}
    
});



module.exports = mongoose.model('trainer', trainerSchema);
