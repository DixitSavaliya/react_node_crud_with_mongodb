import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/users/userSlice";
import studentReducer from "../features/student/studentSlice";
import loginReducer from "../features/login/loginSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    student:studentReducer,
    login: loginReducer
  },
});
