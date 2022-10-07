import axios from "axios";
import {
  createStudentsData,
  editStudentsData,
  getStudentsAllData,
} from "../features/student/studentSlice";
import { getUsersData } from "../features/users/userSlice";

export const getUsers = (dispatch) => {
  const userApi = "https://jsonplaceholder.typicode.com/users";
  return axios
    .get(userApi)
    .then((res) => {
      return dispatch(getUsersData(res.data));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const getStudentsData = (dispatch) => {
  const getStudentApi = "http://localhost:4000/students/";
  return axios
    .get(getStudentApi)
    .then((res) => {
      return dispatch(getStudentsAllData(res.data));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const createStudentData = (dispatch, data) => {
  const createStudent = "http://localhost:4000/students/create-student";
  return axios
    .post(createStudent, data)
    .then((res) => {
      return dispatch(createStudentsData(res.data));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const editStudentData = (dispatch, data, student) => {
  const editStudent = `http://localhost:4000/students/update-student/${student._id}`;
  return axios
    .put(editStudent, data)
    .then((res) => {
      return dispatch(editStudentsData(res.data));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const deleteStudentData = (dispatch, data) => {
    const deleteStudent = `http://localhost:4000/students/delete-student/${data._id}`;
    return axios
      .delete(deleteStudent)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
