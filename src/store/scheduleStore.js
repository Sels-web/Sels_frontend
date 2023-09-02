import {createSlice} from "@reduxjs/toolkit";

const initialState = [{
  eventId: '',
  title: '',
  startDate: '',
  endDate: '',
  color: '',
}]

const scheduleList = createSlice({
  name: 'scheduleList',
  initialState: initialState,
  reducers: {
    getScheduleAction: (state, action) => {
      return action.payload
    },
  },
})
export const { getScheduleAction } = scheduleList.actions
export default scheduleList.reducer