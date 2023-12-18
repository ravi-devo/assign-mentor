const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
    mentorName: {
        type: String,
        required: true
    },
    students: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Students' }
    ],
});

module.exports = mongoose.model('Mentors', mentorSchema);