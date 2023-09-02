import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  title: '',
  color: '',
  eventId: '',
  startDate: '',
  endDate: '',
}

const selectedSchedule = createSlice({
  name: 'selectedSchedule',
  initialState: initialState,
  reducers: {
    getSelectedScheduleAction: (state, action) => {
      return action.payload
    },
    modifySelectedScheduleAction: (state, action) => {
      state[action.payload.name] = action.payload.value
    },
  },
})
export const { getSelectedScheduleAction, modifySelectedScheduleAction } = selectedSchedule.actions
export default selectedSchedule.reducer