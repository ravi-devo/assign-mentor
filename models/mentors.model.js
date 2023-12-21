const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
    mentorName: {
        type: String,
        required: true,
        unique: true
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    }
});

module.exports = mongoose.model('Mentors', mentorSchema);