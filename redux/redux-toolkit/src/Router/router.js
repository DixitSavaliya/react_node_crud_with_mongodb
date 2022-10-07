import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../component/Home/home";
import Login from "../component/Login/login";
import { Counter } from "../features/counter/counter";
import { CreateStudent } from "../features/student/createStudent";
import Student from "../features/student/student";
import { CreateUser } from "../features/users/createUser";
import User from "../features/users/user";
import PrivateRoute from "../PrivateRoute/privateRoute";

const RouterList = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/counter" exact element={<Counter />} />
          <Route path="/user" exact element={<User />} />
          <Route path="/create-user" exact element={<CreateUser />} />
          <Route path="/student" exact element={<Student />} />
          <Route path="/create-student" exact element={<CreateStudent />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterList;
