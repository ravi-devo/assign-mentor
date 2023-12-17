const Students = require("../models/students.model");

const addStudentData = async (req, res) => {
    try {
        const newStudents = Students(req.body);

        await newStudents.save();
        res.status(201).send({ message: "New student added" })

    } catch (error) {
        res.status(500).send({ message: "Internal server error.", error })
    }
}

const getAllStudents = async (req, res) => {
    const students = await Students.find();
    res.status(200).send({
        message: "Data retrieved successfully.",
        data: students
    });
}

const updateStudent = async (req, res) => {
    const studentId = req.params.id;

    try {
        const existingStudent = await Students.findOne({ studentId: studentId });

        if (!existingStudent) {
            return res.status(404).send({ message: "This student does not exist, please input the correct student ID." });
        }

        const id = existingStudent._id;

        //Checking and assigning previous mentor
        let updateFields;
        if (req.body.mentor !== existingStudent.mentor) {
            const { studentName, phoneNumber, mentor, batch, course } = req.body;
            updateFields = {
                studentName, phoneNumber, mentor, previousMentor: existingStudent.mentor, batch, course
            }
        } else {
            updateFields = req.body;
        }

        // Using try/catch for error handling
        try {
            const updatedStudent = await Students.findByIdAndUpdate(id, { $set: updateFields }, { new: true, useFindAndModify: false }).exec();
            // Checking if the update was successful
            if (!updatedStudent) {
                return res.status(404).send({ message: "Student not found or not updated." });
            }

            res.status(200).send({ message: "The student record is updated.", updatedStudent });
        } catch (updateError) {
            res.status(500).send({ message: `Error while updating student: ${updateError.message}` });
        }
    } catch (error) {
        res.status(500).send({ message: `Error while finding student: ${error.message}` });
    }
}

const getPreviousMentor = async (req, res) => {
    console.log("We are here");
    const studentId = req.params.studentId;
    let student;

    try {
        student = await Students.findOne({ studentId });
        console.log("Student record: ", student);
    } catch (error) {
        return res.status(404).send({ message: "Student does not exist." })
    }

    if (!student.previousMentor) {
        return res.status(404).send({ message: `This students doesn't have previous mentor, ${student.mentor} is the first mentor assigned to the student.` })
    }

    res.json({ message: "Previous mentor fetched successfully.", data: { currentMentor: student.mentor, previousMentor: student.previousMentor } });
}

module.exports = { addStudentData, getAllStudents, updateStudent, getPreviousMentor };