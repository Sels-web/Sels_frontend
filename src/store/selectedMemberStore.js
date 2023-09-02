import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  name: '',
  attendance: '',
  accumulated_time: '',
  latencyCost: '',
  sex: '',
  is_admin: '',
  school_id: '',
  department: '',
  accumulated_cost: '',
}

const selectedMember = createSlice({
  name: 'selectedMember',
  initialState: initialState,
  reducers: {
    getSelectedMemberAction: (state, action) => {
      return action.payload
    },
    modifySelectedMemberAction: (state, action) => {
      state[action.payload.name] = action.payload.value
    }
  },
})
export const { getSelectedMemberAction, modifySelectedMemberAction } = selectedMember.actions
export default selectedMember.reducer