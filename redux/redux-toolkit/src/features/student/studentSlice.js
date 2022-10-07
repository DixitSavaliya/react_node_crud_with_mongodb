import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    loading: true,
    studentData: [],
    studentUniqueData: null,
  },
  reducers: {
    getStudentsAllData: (state, action) => {
      state.loading = false;
      state.studentData = action.payload;
    },
    createStudentsData: (state) => {
      state.loading = false;
    },
    editStudentsData: (state) => {
      state.loading = false;
    },
    studentUniquesData: (state, action) => {
      state.studentUniqueData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getStudentsAllData,
  createStudentsData,
  editStudentsData,
  studentUniquesData,
} = studentSlice.actions;

export default studentSlice.reducer;
