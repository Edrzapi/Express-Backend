const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
    trainerName: { type: String, required: true },
    employeeId: { type: String, required: true, unique: [true, 'Employee ID already found.'] },
  

},
    {
        statics: {
            findByName: async function (name) {
                return await this.find({ trainerName: name });
            }
        },
        timestamps: true,
        toJSON: { virtuals: true }

    });



module.exports = mongoose.model('trainer', trainerSchema);
