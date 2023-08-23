import {createSlice} from "@reduxjs/toolkit";

const initialState = [{
  name: '',
  attendance: '',
  accumulated_time: '',
  latencyCost: '',
  sex: '',
  is_admin: '',
  school_id: '',
  department: '',
  accumulated_cost: '',
}]

const memberList = createSlice({
  name: 'memberList',
  initialState: initialState,
  reducers: {
    getMembersAction: (state, action) => {
      return action.payload
    },
  },
})
export const { getMembersAction } = memberList.actions
export default memberList.reducer