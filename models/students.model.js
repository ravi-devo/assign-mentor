const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: true,
        unique: true
    },
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