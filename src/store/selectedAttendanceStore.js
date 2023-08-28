import {createSlice} from "@reduxjs/toolkit";

const initialState = [{
  calendar_id: '',
  id: '',
  attendanceTime:'',
  name: '',
  school_id: '',
  state: '',
  state_point: '',
}]

const selectedAttendance = createSlice({
  name: 'selectedAttendance',
  initialState: initialState,
  reducers: {
    getSelectedAttendanceAction: (state, action) => {
      return action.payload
    },
  },
})
export const { getSelectedAttendanceAction } = selectedAttendance.actions
export default selectedAttendance.reducer