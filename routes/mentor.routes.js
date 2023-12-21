const express = require("express");
const { addMentorsData, getAllMentor, updateMentor, getSpecificMentor } = require("../controllers/mentors.controller");

const router = express.Router();

//Creating a mentors data
router.post('/', addMentorsData);

//Getting all mentor
router.get('/', getAllMentor);

//Selecting one mentor and assigning multiple students
router.put('/:mentorId', updateMentor);

router.get('/:mentorId', getSpecificMentor)

module.exports = router;

