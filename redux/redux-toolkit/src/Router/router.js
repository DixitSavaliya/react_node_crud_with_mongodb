import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../component/Home/home";
import { Counter } from "../features/counter/counter";
import { Login } from "../features/login/login";
import { CreateStudent } from "../features/student/createStudent";
import Student from "../features/student/student";
import { CreateUser } from "../features/users/createUser";
import User from "../features/users/user";
import PrivateRoute from "../PrivateRoute/privateRoute";

const IfLogin = () => {
  return <Navigate to="/" />;
};

const RouterList = () => {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={token ? <IfLogin /> : <Login />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/counter" element={<Counter />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/create-user" element={<CreateUser />} />
          <Route exact path="/student" element={<Student />} />
          <Route exact path="/create-student" element={<CreateStudent />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterList;
