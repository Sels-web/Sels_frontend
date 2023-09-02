import {createSlice} from "@reduxjs/toolkit";

const initialState = []

const attendanceList = createSlice({
  name: 'attendanceList',
  initialState: initialState,
  reducers: {
    getAttendanceAction: (state, action) => {
      return action.payload === undefined ? [] : action.payload
    },
  },
})
export const { getAttendanceAction } = attendanceList.actions
export default attendanceList.reducer