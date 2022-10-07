import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading:true,
    userData: [],
  },
  reducers: {
    getUsersData: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { getUsersData } = userSlice.actions

export default userSlice.reducer