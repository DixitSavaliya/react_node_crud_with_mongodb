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

const RouterList = () => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;
    
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          exact
          element={!token ? <Login /> : <Navigate to="/" />}
        />
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
