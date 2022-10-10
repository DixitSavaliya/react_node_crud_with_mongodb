// Student Model
let studentSchema = require("../models/student");

const createStudent = (req, res, next) => {
  studentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
};

const getStudent = (req, res) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log("data", data);
      res.json(data);
    }
  });
};

const getStudentBYId = (req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

const updateStudent = (req, res, next) => {
  studentSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
};

const deleteStudent = (req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};

module.exports = {
  createStudent,
  getStudent,
  getStudentBYId,
  updateStudent,
  deleteStudent,
};
