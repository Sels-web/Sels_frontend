import {createSlice} from "@reduxjs/toolkit";

const initialState = []

const memberList = createSlice({
  name: 'memberList',
  initialState: initialState,
  reducers: {
    getMembersAction: (state, action) => {
      return action.payload === undefined ? [] : action.payload
    },
  },
})
export const { getMembersAction } = memberList.actions
export default memberList.reducer