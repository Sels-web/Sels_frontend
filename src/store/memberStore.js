import {createSlice} from "@reduxjs/toolkit";

const initialState = [{
  name: '',
  attendance: 0,
  accumulated_time:0,
  latencyCost: 0,
  sex: '',
  is_admin: '',
  school_id: '',
  department: '',
  penalty_cnt: 0,
  accumulated_cost: 0,
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