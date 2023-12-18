const express = require("express");

const { addStudentData, getAllStudents, updateStudent, getPreviousMentor, getStudent } = require("../controllers/students.controller");

const router = express.Router();

const Students = require("../models/students.model");

//To add a new student data
router.post("/", addStudentData);

//To get all students
router.get("/", getAllStudents);

//To get specific student based on id
router.get("/:id", getStudent);

//To assign one student to one mentor
router.put("/:id", updateStudent);

//To get previous mentor
router.get("/previousMentor/:studentId", getPreviousMentor)

module.exports = router;