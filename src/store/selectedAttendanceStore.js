import {createSlice} from "@reduxjs/toolkit";

const initialState = [{
  calendar_id: '',
  id: '',
  attendanceTime:'',
  name: '',
  school_id: '',
  state: 0,
  state_point: '',
}]

const selectedAttendance = createSlice({
  name: 'selectedAttendance',
  initialState: initialState,
  reducers: {
    getSelectedAttendanceAction: (state, action) => {
      return action.payload
    },
    modifySelectedAttendanceAction: (state, action) => {
      state[action.payload.name] = action.payload.value
    }
  },
})
export const { getSelectedAttendanceAction, modifySelectedAttendanceAction } = selectedAttendance.actions
export default selectedAttendance.reducer