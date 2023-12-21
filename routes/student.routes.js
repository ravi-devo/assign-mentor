const express = require("express");

const { addStudentData, studentsWithNoMentor, updateStudent, getPreviousMentor, getStudent, getAllStudents } = require("../controllers/students.controller");

const router = express.Router();

//To add a new student data
router.post("/", addStudentData);

//To get students with no mentor
router.get("/noMentor", studentsWithNoMentor);

//To get specific student based on id
router.get("/:id", getStudent);

//To assign one student to one mentor
router.put("/:id", updateStudent);

//To get previous mentor
router.get("/previousMentor/:studentId", getPreviousMentor);

// To get students with no mentor
router.get("/", getAllStudents);

module.exports = router;