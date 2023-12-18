const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    batch: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    mentor: {
        type: String
    },
    previousMentor: {
        type: String
    }

});

module.exports = mongoose.model("Students", studentSchema);