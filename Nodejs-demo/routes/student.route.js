let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

const { auth } = require("../middleware/auth");
const {
  createStudent,
  getStudent,
  getStudentBYId,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller.js");

// CREATE Student
router.post("/create-student", auth, createStudent);

// Get All Students
router.get("/", auth, getStudent);

// Get Students By Id
router.get("/update-student/:id", auth, getStudentBYId);

// UPDATE student
router.put("/update-student/:id", auth, updateStudent);

// Delete Student
router.delete("/delete-student/:id", auth, deleteStudent);

module.exports = router;
