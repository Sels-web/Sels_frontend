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

const attendanceList = createSlice({
  name: 'attendanceList',
  initialState: initialState,
  reducers: {
    getAttendanceAction: (state, action) => {
      return action.payload
    },
  },
})
export const { getAttendanceAction } = attendanceList.actions
export default attendanceList.reducer