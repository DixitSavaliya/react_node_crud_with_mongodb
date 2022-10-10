import axios from "axios";
import { loginSuccess } from "../features/login/loginSlice";
import {
  createStudentsData,
  editStudentsData,
  getStudentsAllData,
} from "../features/student/studentSlice";
import { getUsersData } from "../features/users/userSlice";

export const login = (dispatch, data) => {
  const loginUser = "http://localhost:4000/auth/login";
  return axios
    .post(loginUser, data)
    .then(async (res) => {
      localStorage.setItem("token", res.data.token);
      await dispatch(loginSuccess(res.data));
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const getUsers = (dispatch) => {
  const userApi = "https://jsonplaceholder.typicode.com/users";
  return axios
    .get(userApi)
    .then(async (res) => {
      return dispatch(getUsersData(res.data));
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const getStudentsData = (dispatch) => {
  const headersData = {
    "Content-Type": "application/json",
    Authorization:
      localStorage.getItem("token") && localStorage.getItem("token"),
  };
  const getStudentApi = "http://localhost:4000/students/";
  return axios
    .get(getStudentApi, { headers: headersData })
    .then(async (res) => {
      await dispatch(getStudentsAllData(res.data));
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const createStudentData = (dispatch, data) => {
  const headersData = {
    "Content-Type": "application/json",
    Authorization:
      localStorage.getItem("token") && localStorage.getItem("token"),
  };
  const createStudent = "http://localhost:4000/students/create-student";
  return axios
    .post(createStudent, data, { headers: headersData })
    .then(async (res) => {
      await dispatch(createStudentsData(res.data));
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const editStudentData = (dispatch, data, student) => {
  const headersData = {
    "Content-Type": "application/json",
    Authorization:
      localStorage.getItem("token") && localStorage.getItem("token"),
  };
  const editStudent = `http://localhost:4000/students/update-student/${student._id}`;
  return axios
    .put(editStudent, data, { headers: headersData })
    .then(async (res) => {
      await dispatch(editStudentsData(res.data));
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export const deleteStudentData = (dispatch, data) => {
  const headersData = {
    "Content-Type": "application/json",
    Authorization:
      localStorage.getItem("token") && localStorage.getItem("token"),
  };
  const deleteStudent = `http://localhost:4000/students/delete-student/${data._id}`;
  return axios
    .delete(deleteStudent, { headers: headersData })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err", err);
    });
};
