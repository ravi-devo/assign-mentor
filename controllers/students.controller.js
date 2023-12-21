const Students = require("../models/students.model");
const Mentors = require("../models/mentors.model");

const addStudentData = async (req, res) => {
    try {
        let newStudent;

        const { studentName, phoneNumber, batch, course, mentor, previousMentor } = req.body;

        if (!mentor) {
            try {
                newStudent = await Students.create(req.body);
                return res.status(201).json({ message: "Student created successfully.", data: newStudent });
            } catch (error) {
                return res.status(500).json({ message: "Internal server error.", error: error });
            }
        }

        let existingMentor = await Mentors.findOne({ mentorName: mentor });

        console.log("Existing mentor: ", existingMentor);

        if (!existingMentor) {
            existingMentor = await Mentors.create({
                mentorName: mentor,
                students: []
            });
        }

        //creating a student record
        newStudent = await Students.create(req.body);

        existingMentor.students.push(newStudent._id);
        await existingMentor.save();

        res.status(201).json({ message: "Student created successfully.", data: newStudent })
    } catch (error) {
        res.status(500).json({ message: "Internal server error.", error: error });
    }
}

const getAllStudents = async (req, res) => {
    const students = await Students.find();
    res.status(200).send({
        message: "Data retrieved successfully.",
        data: students
    });
}

const getStudent = async (req, res) => {
    const id = req.params.id;
    let student;

    try {
        student = await Students.findOne({ _id: id });
    } catch (error) {
        return res.status(404).json({ message: "Student does not exist." });
    }

    res.json({ message: "Student fetched successfully.", data: student })

}

const updateStudent = async (req, res) => {
    const id = req.params.id;
    let newMentor;
    try {
        const existingStudent = await Students.findOne({ _id: id });
        console.log("existing Student", existingStudent)
        if (!existingStudent) {
            return res.status(404).send({ message: "This student does not exist, please input the correct student ID." });
        }

        //Checking if the mentor is changed.
        let updateFields;
        if (req.body.mentor !== existingStudent.mentor) {
            
            //Mentor changed, so assigning previous mentor
            const { studentName, phoneNumber, mentor, batch, course } = req.body;
            updateFields = {
                studentName, phoneNumber, mentor, previousMentor: existingStudent.mentor, batch, course
            }

            if (existingStudent.mentor !== "") {
                //Mentor is changed, so no longer this student should be in the Mentor's students list.
                const existingMentor = await Mentors.findOne({ mentorName: existingStudent.mentor });

                //Removing the student from the old mentor students array.
                const result = await Mentors.findByIdAndUpdate(
                    existingMentor._id,
                    { $pull: { students: id } },
                    { new: true }
                )
            }

            //This student needs to be added in the new mentor's students array(As reference).
            newMentor = await Mentors.findOne({ mentorName: mentor });
            if (!newMentor) {
                newMentor = await Mentors.create({
                    mentorName: mentor,
                    students: []
                });
            }
            newMentor.students.push(id);
            await newMentor.save();
        } else {
            updateFields = req.body;
        }

        // Using try/catch for error handling
        try {
            const updatedStudent = await Students.findByIdAndUpdate(id, { $set: updateFields }, { new: true, useFindAndModify: false }).exec();

            // Checking if the update was successful
            if (!updatedStudent) {
                return res.status(404).send({ message: "Student not updated." });
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
    const studentId = req.params.studentId;
    let student;

    try {
        student = await Students.findOne({_id: studentId });
        console.log("Student record: ", student);
    } catch (error) {
        return res.status(404).send({ message: "Student does not exist." })
    }

    if (!student.mentor && !student.previousMentor) {
        return res.status(404).send({message: "This student just joined, doesn't have a mentor as well as previous mentor."})
    }else if(!student.previousMentor && student.mentor !== ""){
        return res.status(404).send({ message: `This students doesn't have previous mentor, ${student.mentor} is the first mentor assigned to the student.` });
    }

    res.json({ message: "Previous mentor fetched successfully.", data: { currentMentor: student.mentor, previousMentor: student.previousMentor } });
}

const studentsWithNoMentor = async (req, res) => {
    // const students = await Students.find();
    const noMentor = await Students.find({mentor: ""});
    console.log("No mentor", noMentor);
    res.status(200).json({
        message: "Students with no mentor retrieved successfully.",
        data: noMentor
    });
}


module.exports = { addStudentData, studentsWithNoMentor, updateStudent, getPreviousMentor, getStudent, getAllStudents };