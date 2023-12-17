const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
    mentorName: {
        type: String,
        required: true
    },
    studentsList: [
        { type: String }
    ],
})