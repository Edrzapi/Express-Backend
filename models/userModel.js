const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'Plese enter your first name'],},
    lastName: { type: String, required: [true, 'Plese enter your last name'],},
    password: { type: String, required: [true, 'A password is required'],},
    email: { type: String, required: [true, 'An email is required'],},

},
{
    statics : {
    }
});



module.exports = mongoose.model('user', userSchema);




