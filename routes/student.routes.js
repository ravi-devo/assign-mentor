const express = require("express");

const { addStudentData, getAllStudents, updateStudent, getPreviousMentor } = require("../controllers/students.controller");

const router = express.Router();

const Students = require("../models/students.model");

//To add a new student data
router.post("/addStudent", addStudentData);

//To get all students
router.get("/students", getAllStudents);

//To get all students for a particular mentor
// router.get("/specificMentor/:mentorName");

//To assign one student to one mentor
router.put("/students/:id", updateStudent);

//To get previous mentor
router.get("/previousMentor/:studentId", getPreviousMentor)

module.exports = router;