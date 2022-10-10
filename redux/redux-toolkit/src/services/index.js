import axios from "axios";
import { loginSuccess } from "../features/login/loginSlice";
import {
  createStudentsData,
  editStudentsData,
  getStudentsAllData,
} from "../features/student/studentSlice";
import { getUsersData } from "../features/users/userSlice";

let headers = {
  "Content-Type": "application/json",
  authorization: localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null,
};

export const login = (dispatch, data) => {
  const loginUser = "http://localhost:4000/auth/login";
  return axios
    .post(loginUser, data)
    .then((res) => {
      console.log("res", res);
      dispatch(loginSuccess(res.data));
      return res.data;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const getUsers = (dispatch) => {
  const userApi = "https://jsonplaceholder.typicode.com/users";
  return axios
    .get(userApi, { headers: headers })
    .then((res) => {
      dispatch(getUsersData(res.data));
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const getStudentsData = (dispatch) => {
  const getStudentApi = "http://localhost:4000/students/";
  return axios
    .get(getStudentApi, { headers: headers })
    .then((res) => {
      dispatch(getStudentsAllData(res.data));
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const createStudentData = (dispatch, data) => {
  const createStudent = "http://localhost:4000/students/create-student";
  return axios
    .post(createStudent, data, { headers: headers })
    .then((res) => {
      dispatch(createStudentsData(res.data));
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const editStudentData = (dispatch, data, student) => {
  const editStudent = `http://localhost:4000/students/update-student/${student._id}`;
  return axios
    .put(editStudent, data, { headers: headers })
    .then((res) => {
      dispatch(editStudentsData(res.data));
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const deleteStudentData = (dispatch, data) => {
  const deleteStudent = `http://localhost:4000/students/delete-student/${data._id}`;
  return axios
    .delete(deleteStudent, { headers: headers })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};
