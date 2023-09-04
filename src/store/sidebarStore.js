import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

const changeState = createSlice({
  name: 'sidebarShow',
  initialState: initialState,
  reducers: {
    setSidebarState: (state, action) => {
      console.log(action.payload)
      switch (action.payload.type) {
        case 'set':
          return { ...action.payload}
        default:
          return action.payload
      }
    },
  },
})

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }
export const { setSidebarState } = changeState.actions

export default changeState.reducer